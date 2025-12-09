// routes/conversas.js - rotas para conversas
const express = require('express');
const router = express.Router();
const {
  getAllConversas,
  getConversaById,
  createConversa,
  updateConversa,
  deleteConversa,
  getConversasByAluno,
  getConversasByProfessor,
  getMensagensByConversa,
  addMensagemToConversa
} = require('../controllers/conversaController');

// ==========================
//        CREATE CONVERSA
// ==========================
router.post('/', createConversa);

// ==========================
//        LIST ALL CONVERSAS
// ==========================
router.get('/', getAllConversas);

// ==========================
//     GET CONVERSA BY ID
// ==========================
router.get('/:id', getConversaById);

// ==========================
//     GET CONVERSAS BY ALUNO
// ==========================
router.get('/aluno/:aluno_id', getConversasByAluno);

// ==========================
//     GET CONVERSAS BY PROFESSOR
// ==========================
router.get('/professor/:professor_id', getConversasByProfessor);

// ==========================
//     GET MENSAGENS BY CONVERSA
// ==========================
router.get('/:id/mensagens', getMensagensByConversa);

// ==========================
//     ADD MENSAGEM TO CONVERSA
// ==========================
router.post('/:id/mensagens', addMensagemToConversa);

// ==========================
//        UPDATE CONVERSA
// ==========================
router.put('/:id', updateConversa);

// ==========================
//        DELETE CONVERSA
// ==========================
router.delete('/:id', deleteConversa);

module.exports = router;