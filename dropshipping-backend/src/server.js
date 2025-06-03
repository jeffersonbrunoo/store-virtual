import app from './app.js';
import { connectToDatabase } from './config/database.js';

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // 1. Conectar ao MongoDB Atlas
    await connectToDatabase();

    // 2. Subir o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
