// src/controllers/orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * Criar um novo pedido (POST /api/orders)
 */
export async function createOrder(req, res, next) {
  try {
    const {
      products: items,
      customerName,
      customerEmail,
      shippingAddress,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ erro: 'Nenhum produto para criar o pedido' });
    }

    let total = 0;
    const detalhesProdutos = [];

    for (const item of items) {
      const prod = await Product.findById(item.product);
      if (!prod) {
        return res.status(404).json({ erro: `Produto não encontrado: ${item.product}` });
      }
      if (item.quantity <= 0) {
        return res.status(400).json({ erro: 'Quantidade inválida' });
      }

      const precoUnitario = prod.price;
      total += precoUnitario * item.quantity;

      detalhesProdutos.push({
        product: prod._id,
        quantity: item.quantity,
        priceAtPurchase: precoUnitario,
      });
    }

    const novoPedido = new Order({
      products: detalhesProdutos,
      totalAmount: total,
      customerName,
      customerEmail,
      shippingAddress,
    });

    const pedidoSalvo = await novoPedido.save();
    res.status(201).json(pedidoSalvo);
  } catch (err) {
    next(err);
  }
}

/**
 * Listar todos os pedidos (GET /api/orders)
 */
export async function getAllOrders(req, res, next) {
  try {
    const pedidos = await Order.find().populate('products.product', 'name price');
    res.status(200).json(pedidos);
  } catch (err) {
    next(err);
  }
}

/**
 * Obter pedido por ID (GET /api/orders/:id)
 */
export async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;
    const pedido = await Order.findById(id).populate('products.product', 'name price');
    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    res.status(200).json(pedido);
  } catch (err) {
    next(err);
  }
}

/**
 * Atualizar status de pedido (PUT /api/orders/:id/status)
 */
export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pedidoAtualizado = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!pedidoAtualizado) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    res.status(200).json(pedidoAtualizado);
  } catch (err) {
    next(err);
  }
}

/**
 * Deletar um pedido (DELETE /api/orders/:id)
 */
export async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    const pedidoDeletado = await Order.findByIdAndDelete(id);
    if (!pedidoDeletado) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    res.status(200).json({ mensagem: 'Pedido removido com sucesso' });
  } catch (err) {
    next(err);
  }
}
