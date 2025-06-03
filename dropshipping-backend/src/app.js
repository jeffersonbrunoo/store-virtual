import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config(); // Carrega variáveis do .env

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas básicas de saúde (health check)
app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'API Loja Online está no ar! 🙌' });
});

// Rotas específicas
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Middleware de “não encontrado” (404)
app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Middleware genérico de tratamento de erros
app.use((err, req, res, next) => {
  console.error('[ERROR HANDLER]', err);
  res.status(err.status || 500).json({
    erro: err.message || 'Erro interno do servidor'
  });
});

export default app;
