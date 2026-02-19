const Product = require("../models/productModel");

// // GET all products
// const getProducts = async (req, res) => {
//   const products = await Product.find({});
//   res.json(products);
// };


const getProducts = async (req, res) => {
  const pageSize = 5; // products per page
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

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
  const { name, price, image, brand, category, countInStock, description } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
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
    brand,
    category,
    countInStock
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

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

const fs = require("fs");
const path = require("path");

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




module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
