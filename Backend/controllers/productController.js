import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// // GET all products
// const getProducts = async (req, res) => {
//   const products = await Product.find({});
//   res.json(products);
// };


const getProducts = async (req, res) => {
  const pageSize = 8; // products per page
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};

  // isFeatured filter for Home page
  const isFeatured = req.query.isFeatured === "true" ? { isFeatured: true } : {};

  // Combine price filters if both exist
  let priceFilter = {};
  if (req.query.minPrice || req.query.maxPrice) {
    priceFilter.price = {};
    if (req.query.minPrice) priceFilter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) priceFilter.price.$lte = Number(req.query.maxPrice);
  }

  const query = { ...keyword, ...category, ...priceFilter, ...isFeatured };

  const count = await Product.countDocuments(query);

  const products = await Product.find(query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json({ product }); // 👈 IMPORTANT FIX
    } else {
      res.status(404).json({ message: "Product not found" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




// CREATE product (Admin)
const createProduct = async (req, res) => {
  const { name, price, image, images, brand, category, countInStock, description } = req.body;
  
  // Set main image as the first one from the images array if provided
  const mainImage = images && images.length > 0 ? images[0] : image;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image: mainImage,
    images: images || [image],
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};


// UPDATE product (Admin)
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    images,
    brand,
    category,
    countInStock
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    
    // Update main image and images array
    if (images && images.length > 0) {
      product.images = images;
      product.image = images[0]; // First image is main
    } else if (image) {
      product.image = image;
      product.images = [image];
    }

    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    // Persist isFeatured — use explicit check so false is not skipped
    if (req.body.isFeatured !== undefined) {
      product.isFeatured = req.body.isFeatured;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};


// const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     await product.deleteOne();
//     res.json({ message: "Product removed" });
//   } else {
//     res.status(404).json({ message: "Product not found" });
//   }
// };

// fs and path imported at top

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Delete image file if exists
    if (product.image && product.image.startsWith("/uploads")) {
      const imagePath = path.join(__dirname, "..", product.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.deleteOne();
    res.json({ message: "Product and image removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};




const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    // Check if user has purchased the product
    const orders = await Order.find({ user: req.user._id });
    const hasPurchased = orders.some((order) =>
      order.orderItems.some((item) => item.product.toString() === product._id.toString())
    );

    if (!hasPurchased) {
      return res.status(400).json({ message: "You must purchase the product before reviewing it" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
      }).limit(4);
      res.json(relatedProducts);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getRelatedProducts
};
