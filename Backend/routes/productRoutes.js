import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getRelatedProducts
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/")
  .get(getProducts)
  .post(protect, admin, createProduct);

router.get("/categories", getCategories);

// router.route("/:id").get(getProductById);

router.route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id/related").get(getRelatedProducts);


export default router;
