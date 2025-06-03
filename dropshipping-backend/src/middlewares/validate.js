// src/middlewares/validate.js
import Joi from 'joi';

// Esquema de validação para Product
const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'O nome do produto não pode ser vazio',
    'string.min': 'O nome do produto deve ter, no mínimo, 2 caracteres',
    'any.required': 'O campo name é obrigatório'
  }),
  description: Joi.string().allow('').max(500),
  price: Joi.number().min(0).required().messages({
    'number.base': 'O preço deve ser um número',
    'number.min': 'O preço não pode ser negativo',
    'any.required': 'O campo price é obrigatório'
  }),
  imageUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'A URL da imagem deve ser válida'
  }),
  stock: Joi.number().integer().min(0).messages({
    'number.base': 'O estoque deve ser um número',
    'number.min': 'O estoque não pode ser negativo',
    'number.integer': 'O estoque deve ser um número inteiro'
  }),
  category: Joi.string().allow('').max(50),
});

// Esquema de validação para Order
const orderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().length(24).required().messages({
        'string.length': 'ID de produto deve ter 24 caracteres'
      }),
      quantity: Joi.number().integer().min(1).required().messages({
        'number.min': 'Quantidade mínima é 1',
        'any.required': 'Quantidade é obrigatória'
      }),
    })
  ).min(1).required().messages({
    'array.min': 'Deve haver ao menos 1 produto no pedido',
    'any.required': 'O campo products é obrigatório'
  }),
  customerName: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nome do cliente não pode ser vazio',
    'any.required': 'O campo customerName é obrigatório'
  }),
  customerEmail: Joi.string().email().required().messages({
    'string.email': 'E-mail do cliente deve ser válido',
    'any.required': 'O campo customerEmail é obrigatório'
  }),
  shippingAddress: Joi.object({
    street: Joi.string().required().messages({ 'any.required': 'Rua é obrigatória' }),
    city: Joi.string().required().messages({ 'any.required': 'Cidade é obrigatória' }),
    zipCode: Joi.string().required().messages({ 'any.required': 'CEP é obrigatório' }),
    country: Joi.string().required().messages({ 'any.required': 'País é obrigatório' }),
  }).required().messages({ 'any.required': 'O campo shippingAddress é obrigatório' }),
});

export function validateProduct(req, res, next) {
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const mensagens = error.details.map((d) => d.message);
    return res.status(400).json({ erros: mensagens });
  }
  next();
}

export function validateOrder(req, res, next) {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const mensagens = error.details.map((d) => d.message);
    return res.status(400).json({ erros: mensagens });
  }
  next();
}
