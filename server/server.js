// server.js - Arquivo principal do servidor
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Inicializa o app Express
const app = express();

// Middlewares
app.use(cors({
  origin: '*' // Aceita requisições de qualquer origem - apenas para desenvolvimento
}));
// app.use(express.json({ limit: '10mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'Servidor FikiFit rodando!' });
});

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ message: 'Teste OK!' });
});

// Configuração da porta
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(` servidor rodando na porta ${PORT}`);
  console.log(` endpoints disponíveis:`);
  console.log(` - GET / (raiz)`);
  console.log(` - GET /test (teste)`);
  console.log(` - POST /api/auth/login (login)`);
  console.log(` - POST /api/users (criar usuário)`);
  console.log(` - POST /api/users/create (criar usuário alternativo)`);
  console.log(` - GET /api/users/ (listar todos usuários)`);
  console.log(` - GET /api/users/:id (obter usuário por ID)`);
  console.log(` - GET /api/users/email/:email (obter usuário por email)`);
  console.log(` - PUT /api/users/update/:id (atualizar usuário)`);
  console.log(` - DELETE /api/users/delete/:id (deletar usuário)`);
});

module.exports = app;