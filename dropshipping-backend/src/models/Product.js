// src/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'O preço do produto é obrigatório'],
      min: [0, 'O preço não pode ser negativo'],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Estoque não pode ser negativo'],
    },
    category: {
      type: String,
      trim: true,
      default: 'sem categoria',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
