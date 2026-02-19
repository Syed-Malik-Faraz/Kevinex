const express = require("express");
const router = express.Router();
const {
    addOrderItems,
    getOrders,
    getOrderById,
    getRevenue,
    updateOrderToPaid,
    updateOrderToDelivered
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.get("/revenue", protect, admin, getRevenue);
router.route("/:id").get(protect, admin, getOrderById);
router.put("/:id/pay", protect, admin, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

module.exports = router;
