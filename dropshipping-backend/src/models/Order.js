// src/models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantidade deve ser no mínimo 1'],
        },
        priceAtPurchase: {
          type: Number,
          required: true,
          min: [0, 'Preço inválido'],
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total inválido'],
    },
    customerName: {
      type: String,
      required: [true, 'Nome do cliente é obrigatório'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'E-mail do cliente é obrigatório'],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Informe um e-mail válido'],
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pendente', 'em processamento', 'enviado', 'entregue', 'cancelado'],
      default: 'pendente',
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

const Order = mongoose.model('Order', orderSchema);
export default Order;
