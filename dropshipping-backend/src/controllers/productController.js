// src/controllers/productController.js
import Product from '../models/Product.js';

/**
 * Listar todos os produtos (GET /api/products)
 */
export async function getAllProducts(req, res, next) {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

/**
 * Obter um produto por ID (GET /api/products/:id)
 */
export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const produto = await Product.findById(id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (err) {
    next(err);
  }
}

/**
 * Criar um novo produto (POST /api/products)
 */
export async function createProduct(req, res, next) {
  try {
    const dados = req.body;
    const novoProduto = new Product(dados);
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (err) {
    next(err);
  }
}

/**
 * Atualizar um produto (PUT /api/products/:id)
 */
export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const dadosParaAtualizar = req.body;
    const produtoAtualizado = await Product.findByIdAndUpdate(
      id,
      dadosParaAtualizar,
      { new: true, runValidators: true }
    );
    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json(produtoAtualizado);
  } catch (err) {
    next(err);
  }
}

/**
 * Deletar um produto (DELETE /api/products/:id)
 */
export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const produtoDeletado = await Product.findByIdAndDelete(id);
    if (!produtoDeletado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Produto removido com sucesso' });
  } catch (err) {
    next(err);
  }
}
