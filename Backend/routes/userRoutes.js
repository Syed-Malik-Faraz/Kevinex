import express from "express";
const router = express.Router();
import { registerUser, authUser, getUsers, deleteUser, updateUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getUsers);
router.post("/register", registerUser);
router.post("/login", authUser);
router.route("/:id")
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);

export default router;
