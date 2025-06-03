// dropshipping-backend/src/tests/order.test.js

import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import { connectToDatabase, closeDatabase } from '../config/database.js';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectToDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

beforeEach(async () => {
  const { default: Order } = await import('../models/Order.js');
  const { default: Product } = await import('../models/Product.js');
  // Limpa tanto pedidos quanto produtos entre testes
  await Order.deleteMany({});
  await Product.deleteMany({});
});

describe('API de Pedidos', () => {
  it('Não deve criar pedido sem produtos (POST /api/orders)', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        products: [], // array vazio => erro
        customerName: 'Test',
        customerEmail: 'test@example.com',
        shippingAddress: {
          street: 'Rua Teste',
          city: 'Cidade',
          zipCode: '00000-000',
          country: 'Brasil'
        }
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(Array.isArray(res.body.erros)).toBe(true);
    // Deve conter mensagem que indica "Deve haver ao menos 1 produto" ou similar
    expect(res.body.erros.some(msg => msg.toLowerCase().includes('produto'))).toBe(true);
  });

  it('Deve criar pedido corretamente (POST /api/orders)', async () => {
    // 1) Cria dois produtos para usar no pedido
    const { default: Product } = await import('../models/Product.js');
    const prodA = await Product.create({ name: 'Produto A', price: 10.0 });
    const prodB = await Product.create({ name: 'Produto B', price: 20.0 });

    // 2) Monta payload do pedido usando os IDs recém-criados
    const novoPedido = {
      products: [
        { product: prodA._id.toString(), quantity: 2 },
        { product: prodB._id.toString(), quantity: 1 }
      ],
      customerName: 'Cliente X',
      customerEmail: 'cliente.x@example.com',
      shippingAddress: {
        street: 'Rua dos Testes, 123',
        city: 'Campina Grande',
        zipCode: '58400-000',
        country: 'Brasil'
      }
    };

    // 3) Dispara a requisição de criação de pedido
    const res = await request(app)
      .post('/api/orders')
      .send(novoPedido)
      .set('Accept', 'application/json');

    // 4) Verificações:
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    // totalAmount deve bater com 10*2 + 20*1 = 40
    expect(res.body.totalAmount).toBeCloseTo(10.0 * 2 + 20.0 * 1);
    expect(res.body.products.length).toBe(2);
    // Cada item deve conter product (objeto populado), quantity e priceAtPurchase
    expect(res.body.products[0]).toHaveProperty('product');
    expect(res.body.products[0]).toHaveProperty('quantity', 2);
    expect(res.body.products[0]).toHaveProperty('priceAtPurchase', 10.0);
  });

  it('Deve listar todos os pedidos (GET /api/orders)', async () => {
    const { default: Order } = await import('../models/Order.js');
    const { default: Product } = await import('../models/Product.js');

    // Cria um produto e um pedido diretamente via Mongoose
    const prod = await Product.create({ name: 'Produto Listagem', price: 5.0 });
    await Order.create({
      products: [
        { product: prod._id, quantity: 3, priceAtPurchase: 5.0 }
      ],
      totalAmount: 15.0,
      customerName: 'Fulano',
      customerEmail: 'fulano@example.com',
      shippingAddress: {
        street: 'Rua Fulano',
        city: 'Cidade',
        zipCode: '11111-111',
        country: 'Brasil'
      }
    });

    const res = await request(app).get('/api/orders');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    // Verifica campo padrão “status”: "pendente"
    expect(res.body[0]).toHaveProperty('status', 'pendente');
  });

  it('Deve obter um pedido por ID (GET /api/orders/:id)', async () => {
    const { default: Order } = await import('../models/Order.js');
    const { default: Product } = await import('../models/Product.js');

    // Cria produto e pedido
    const prod = await Product.create({ name: 'Produto X', price: 7.5 });
    const pedidoCriado = await Order.create({
      products: [
        { product: prod._id, quantity: 2, priceAtPurchase: 7.5 }
      ],
      totalAmount: 15.0,
      customerName: 'Beltrano',
      customerEmail: 'beltrano@example.com',
      shippingAddress: {
        street: 'Rua B',
        city: 'Cidade',
        zipCode: '22222-222',
        country: 'Brasil'
      }
    });

    const res = await request(app).get(`/api/orders/${pedidoCriado._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', pedidoCriado._id.toString());
    expect(res.body.customerEmail).toBe('beltrano@example.com');
  });

  it('Deve atualizar o status do pedido (PUT /api/orders/:id/status)', async () => {
    const { default: Order } = await import('../models/Order.js');
    const { default: Product } = await import('../models/Product.js');

    // Cria produto e pedido
    const prod = await Product.create({ name: 'Prod Status', price: 8.0 });
    const pedido = await Order.create({
      products: [
        { product: prod._id, quantity: 1, priceAtPurchase: 8.0 }
      ],
      totalAmount: 8.0,
      customerName: 'Cliente Status',
      customerEmail: 'status@example.com',
      shippingAddress: {
        street: 'Rua C',
        city: 'Cidade',
        zipCode: '33333-333',
        country: 'Brasil'
      }
    });

    // Atualiza o status para "enviado"
    const res = await request(app)
      .put(`/api/orders/${pedido._id}/status`)
      .send({ status: 'enviado' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'enviado');
  });

  it('Deve deletar um pedido existente (DELETE /api/orders/:id)', async () => {
    const { default: Order } = await import('../models/Order.js');
    const { default: Product } = await import('../models/Product.js');

    const prod = await Product.create({ name: 'Prod Del', price: 12.0 });
    const pedido = await Order.create({
      products: [
        { product: prod._id, quantity: 2, priceAtPurchase: 12.0 }
      ],
      totalAmount: 24.0,
      customerName: 'Fulana',
      customerEmail: 'fulana@example.com',
      shippingAddress: {
        street: 'Rua D',
        city: 'Cidade',
        zipCode: '44444-444',
        country: 'Brasil'
      }
    });

    const res = await request(app).delete(`/api/orders/${pedido._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Pedido removido com sucesso');

    // Confirma que foi excluído
    const existia = await Order.findById(pedido._id);
    expect(existia).toBeNull();
  });
});
