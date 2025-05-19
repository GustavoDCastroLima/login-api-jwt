const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Corrigido o nome
    console.log("✅ MongoDB conectado");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;