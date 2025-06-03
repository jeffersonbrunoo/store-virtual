// src/routes/productRoutes.js
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { validateProduct } from '../middlewares/validate.js';

const router = Router();

// GET /api/products
router.get('/', getAllProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// POST /api/products (validação)
router.post('/', validateProduct, createProduct);

// PUT /api/products/:id (validação)
router.put('/:id', validateProduct, updateProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

export default router;
