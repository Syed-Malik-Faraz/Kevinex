import express from "express";
const router = express.Router();
import upload from "../middleware/uploadMiddleware.js";
import { protect, admin } from "../middleware/authMiddleware.js";
router.post("/", protect, admin, upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    imagePath: `/${req.file.path}`,
  });
});

export default router;
