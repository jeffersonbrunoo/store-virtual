// src/routes/orderRoutes.js
import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController.js';
import { validateOrder } from '../middlewares/validate.js';

const router = Router();

// POST /api/orders (validação)
router.post('/', validateOrder, createOrder);

// GET /api/orders
router.get('/', getAllOrders);

// GET /api/orders/:id
router.get('/:id', getOrderById);

// PUT /api/orders/:id/status
router.put('/:id/status', updateOrderStatus);

// DELETE /api/orders/:id
router.delete('/:id', deleteOrder);

export default router;
