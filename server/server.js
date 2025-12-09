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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const treinoRoutes = require('./routes/treinos');
const exercicioRoutes = require('./routes/exercicios');
const dietaRoutes = require('./routes/dietas');
const mensagemRoutes = require('./routes/mensagens');
const conversaRoutes = require('./routes/conversas');
const historicoPesoRoutes = require('./routes/historicoPeso');

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/treinos', treinoRoutes);
app.use('/api/exercicios', exercicioRoutes);
app.use('/api/dietas', dietaRoutes);
app.use('/api/mensagens', mensagemRoutes);
app.use('/api/conversas', conversaRoutes);
app.use('/api/historico-peso', historicoPesoRoutes);

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
  console.log(`Servidor FikiFit rodando na porta ${PORT}`);
  console.log(`Endpoints disponíveis:`);
  console.log(` - GET / (raiz)`);
  console.log(` - GET /test (teste)`);
  console.log(` - POST /api/auth/register (registrar usuário)`);
  console.log(` - POST /api/auth/login (login de usuário)`);
  console.log(` - POST /api/users (criar usuário)`);
  console.log(` - GET /api/users (listar todos usuários)`);
  console.log(` - GET /api/users/:id (obter usuário por ID)`);
  console.log(` - GET /api/users/type/:user_type (obter usuários por tipo)`);
  console.log(` - PUT /api/users/update/:id (atualizar usuário)`);
  console.log(` - DELETE /api/users/:id (deletar usuário)`);
  console.log(` - POST /api/treinos (criar treino)`);
  console.log(` - GET /api/treinos (listar todos treinos)`);
  console.log(` - GET /api/treinos/:id (obter treino por ID)`);
  console.log(` - GET /api/treinos/aluno/:aluno_id (obter treinos por aluno)`);
  console.log(` - GET /api/treinos/personal/:personal_id (obter treinos por personal)`);
  console.log(` - PUT /api/treinos/:id (atualizar treino)`);
  console.log(` - DELETE /api/treinos/:id (deletar treino)`);
  console.log(` - POST /api/treinos/:id/exercicios (adicionar exercício a treino)`);
  console.log(` - GET /api/treinos/:id/exercicios (obter exercícios de treino)`);
  console.log(` - POST /api/exercicios (criar exercício)`);
  console.log(` - GET /api/exercicios (listar todos exercícios)`);
  console.log(` - GET /api/exercicios/:id (obter exercício por ID)`);
  console.log(` - GET /api/exercicios/treino/:treino_id (obter exercícios por treino)`);
  console.log(` - PUT /api/exercicios/:id (atualizar exercício)`);
  console.log(` - DELETE /api/exercicios/:id (deletar exercício)`);
  console.log(` - POST /api/dietas (criar dieta)`);
  console.log(` - GET /api/dietas (listar todas dietas)`);
  console.log(` - GET /api/dietas/:id (obter dieta por ID)`);
  console.log(` - GET /api/dietas/aluno/:aluno_id (obter dietas por aluno)`);
  console.log(` - GET /api/dietas/personal/:personal_id (obter dietas por personal)`);
  console.log(` - PUT /api/dietas/:id (atualizar dieta)`);
  console.log(` - DELETE /api/dietas/:id (deletar dieta)`);
  console.log(` - POST /api/mensagens (criar mensagem)`);
  console.log(` - GET /api/mensagens (listar todas mensagens)`);
  console.log(` - GET /api/mensagens/:id (obter mensagem por ID)`);
  console.log(` - GET /api/mensagens/conversa/:conversa_id (obter mensagens por conversa)`);
  console.log(` - GET /api/mensagens/remetente/:remetente_id (obter mensagens por remetente)`);
  console.log(` - PUT /api/mensagens/:id (atualizar mensagem)`);
  console.log(` - DELETE /api/mensagens/:id (deletar mensagem)`);
  console.log(` - POST /api/conversas (criar conversa)`);
  console.log(` - GET /api/conversas (listar todas conversas)`);
  console.log(` - GET /api/conversas/:id (obter conversa por ID)`);
  console.log(` - GET /api/conversas/aluno/:aluno_id (obter conversas por aluno)`);
  console.log(` - GET /api/conversas/professor/:professor_id (obter conversas por professor)`);
  console.log(` - GET /api/conversas/:id/mensagens (obter mensagens de conversa)`);
  console.log(` - POST /api/conversas/:id/mensagens (adicionar mensagem a conversa)`);
  console.log(` - PUT /api/conversas/:id (atualizar conversa)`);
  console.log(` - DELETE /api/conversas/:id (deletar conversa)`);
  console.log(` - POST /api/historico-peso (criar registro de peso)`);
  console.log(` - GET /api/historico-peso (listar todos registros de peso)`);
  console.log(` - GET /api/historico-peso/:id (obter registro de peso por ID)`);
  console.log(` - GET /api/historico-peso/aluno/:aluno_id (obter histórico de peso por aluno)`);
  console.log(` - PUT /api/historico-peso/:id (atualizar registro de peso)`);
  console.log(` - DELETE /api/historico-peso/:id (deletar registro de peso)`);
});

module.exports = app;