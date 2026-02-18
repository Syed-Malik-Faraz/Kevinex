const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");
const { deleteProduct } = require("../controllers/productController");
const productController = require('../controllers/productController');
const { getProductById, updateProduct } = productController;

const {
  getProducts,
  createProduct
} = require("../controllers/productController");

router.post("/", protect, admin, upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    imagePath: `/${req.file.path}`,
  });
});


router.route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);


module.exports = router;
