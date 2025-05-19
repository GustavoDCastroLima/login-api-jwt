const express = require('express');
const cors = require('cors'); // Corrigido o nome
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

const app = express();

// Conexão com o MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno!');
});

module.exports = app;