// dropshipping-backend/src/tests/product.test.js

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
  const { default: Product } = await import('../models/Product.js');
  await Product.deleteMany({});
});

describe('API de Produtos', () => {
  it('Deve retornar lista vazia inicialmente (GET /api/products)', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('Deve criar um produto válido (POST /api/products)', async () => {
    const novoProduto = {
      name: 'Camiseta Teste',
      description: 'Camiseta para testes',
      price: 79.9,
      imageUrl: 'https://exemplo.com/camiseta.jpg',
      stock: 10,
      category: 'roupas'
    };

    const res = await request(app)
      .post('/api/products')
      .send(novoProduto)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(novoProduto.name);
    expect(res.body.price).toBe(novoProduto.price);
    expect(res.body.stock).toBe(novoProduto.stock);
    expect(res.body.category).toBe(novoProduto.category);
  });

  it('Não deve criar produto com campo obrigatório faltando (POST /api/products)', async () => {
    const produtoIncompleto = {
      // faltando name e price
      description: 'Sem nome e sem preço'
    };

    const res = await request(app)
      .post('/api/products')
      .send(produtoIncompleto)
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(Array.isArray(res.body.erros)).toBe(true);
    // Deve conter pelo menos uma mensagem indicando "name" e/ou "price" faltando
    expect(res.body.erros.some(msg => msg.toLowerCase().includes('name'))).toBe(true);
    expect(res.body.erros.some(msg => msg.toLowerCase().includes('price'))).toBe(true);
  });

  it('Deve retornar um produto existente por ID (GET /api/products/:id)', async () => {
    const { default: Product } = await import('../models/Product.js');
    const produtoCriado = await Product.create({
      name: 'Teste GetById',
      price: 29.9
    });

    const res = await request(app).get(`/api/products/${produtoCriado._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', produtoCriado._id.toString());
    expect(res.body.name).toBe('Teste GetById');
  });

  it('Deve retornar 404 para ID inexistente (GET /api/products/:id)', async () => {
    const idFake = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/products/${idFake}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('erro', 'Produto não encontrado');
  });

  it('Deve atualizar um produto existente (PUT /api/products/:id)', async () => {
    const { default: Product } = await import('../models/Product.js');
    const produto = await Product.create({
      name: 'Produto Antigo',
      price: 100.0
    });

    // Como o middleware de validação exige name e price,
   // precisamos reenviá-los no payload de atualização:
   const atualizacao = {
     name: 'Produto Antigo (Atualizado)',
     price: 150.0,
     stock: 5
   };
    const res = await request(app)
      .put(`/api/products/${produto._id}`)
      .send(atualizacao)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', produto._id.toString());
    expect(res.body.name).toBe(atualizacao.name);
    expect(res.body.price).toBe(150.0);
    expect(res.body.stock).toBe(5);
  });

  it('Deve deletar um produto existente (DELETE /api/products/:id)', async () => {
    const { default: Product } = await import('../models/Product.js');
    const produto = await Product.create({
      name: 'Para Deletar',
      price: 20.0
    });

    const res = await request(app).delete(`/api/products/${produto._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Produto removido com sucesso');

    // Confirma que foi realmente excluído
    const existe = await Product.findById(produto._id);
    expect(existe).toBeNull();
  });
});
