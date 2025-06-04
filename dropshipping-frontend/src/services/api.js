// src/services/api.js
import axios from 'axios';

// Defina a baseURL do backend:
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // ajuste se o seu backend estiver em outra porta
  headers: {
    'Content-Type': 'application/json'
  }
});

// 1) Buscar todos os produtos
export async function getProducts() {
  const response = await api.get('/products');
  return response.data; // retorna array de produtos
}

// 2) Buscar um produto por ID
export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data; // retorna o objeto do produto
}

// 3) Criar um pedido (orderData = { products: [...], customerName, customerEmail, shippingAddress })
export async function createOrder(orderData) {
  const response = await api.post('/orders', orderData);
  return response.data; // retorna o pedido criado
}

export default {
  getProducts,
  getProductById,
  createOrder
};
