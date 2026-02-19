const express = require("express");
const router = express.Router();
const { registerUser, authUser, getUsers, deleteUser, updateUser } = require("../controllers/userController.js");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getUsers);
router.post("/register", registerUser);
router.post("/login", authUser);
router.route("/:id")
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);

module.exports = router;
