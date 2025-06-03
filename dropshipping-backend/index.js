import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productRoutes  from './src/routes/productRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.log('Erro MongoDB:', err));

// Rotas
app.use('/api/produtos', productRoutes);
app.use('/api/pedidos', orderRoutes);

app.get('/', (req, res) => res.send('API Dropshipping online!'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
