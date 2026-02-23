import express from "express";
const router = express.Router();
import {
    addOrderItems,
    getOrders,
    getOrderById,
    getRevenue,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/revenue", protect, admin, getRevenue);
router.route("/:id").get(protect, getOrderById);
router.put("/:id/pay", protect, admin, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
