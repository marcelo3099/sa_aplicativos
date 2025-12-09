// routes/mensagens.js - rotas para mensagens
const express = require('express');
const router = express.Router();
const {
  getAllMensagens,
  getMensagemById,
  createMensagem,
  updateMensagem,
  deleteMensagem,
  getMensagensByConversa,
  getMensagensByRemetente
} = require('../controllers/mensagemController');

// ==========================
//        CREATE MENSAGEM
// ==========================
router.post('/', createMensagem);

// ==========================
//        LIST ALL MENSAGENS
// ==========================
router.get('/', getAllMensagens);

// ==========================
//     GET MENSAGEM BY ID
// ==========================
router.get('/:id', getMensagemById);

// ==========================
//     GET MENSAGENS BY CONVERSA
// ==========================
router.get('/conversa/:conversa_id', getMensagensByConversa);

// ==========================
//     GET MENSAGENS BY REMETENTE
// ==========================
router.get('/remetente/:remetente_id', getMensagensByRemetente);

// ==========================
//        UPDATE MENSAGEM
// ==========================
router.put('/:id', updateMensagem);

// ==========================
//        DELETE MENSAGEM
// ==========================
router.delete('/:id', deleteMensagem);

module.exports = router;