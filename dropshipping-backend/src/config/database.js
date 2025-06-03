import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export async function connectToDatabase() {
  if (process.env.NODE_ENV === 'test') {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    try {
      await mongoose.connect(uri);
      console.log('✅ Conectado ao MongoDB em memória (modo de teste)');
    } catch (error) {
      console.error('❌ Erro ao conectar ao MongoDB em memória:', error);
      process.exit(1);
    }
  } else {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('🛑 MONGODB_URI não definida em .env');
      process.exit(1);
    }
    try {
      await mongoose.connect(uri);
      console.log('✅ Conectado ao MongoDB Atlas');
    } catch (error) {
      console.error('❌ Erro ao conectar ao MongoDB Atlas:', error.message);
      process.exit(1);
    }
  }
}

export async function closeDatabase() {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    console.log('🛑 Mongo em memória parado (testes concluídos)');
  } else {
    await mongoose.connection.close();
    console.log('🛑 Conexão com MongoDB encerrada');
  }
}
