const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// @desc    Create new order & reduce stock
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // 🔥 CHECK & REDUCE STOCK
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.countInStock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      product.countInStock -= item.qty;
      await product.save();
    }

    // 🔥 CREATE ORDER
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems };
