// routes/historicoPeso.js - rotas para histórico de peso
const express = require('express');
const router = express.Router();
const {
  getAllHistoricoPeso,
  getHistoricoPesoById,
  createHistoricoPeso,
  updateHistoricoPeso,
  deleteHistoricoPeso,
  getHistoricoPesoByAluno
} = require('../controllers/historicoPesoController');

// ==========================
//        CREATE HISTORICO PESO
// ==========================
router.post('/', createHistoricoPeso);

// ==========================
//        LIST ALL HISTORICO PESO
// ==========================
router.get('/', getAllHistoricoPeso);

// ==========================
//     GET HISTORICO PESO BY ID
// ==========================
router.get('/:id', getHistoricoPesoById);

// ==========================
//     GET HISTORICO PESO BY ALUNO
// ==========================
router.get('/aluno/:aluno_id', getHistoricoPesoByAluno);

// ==========================
//        UPDATE HISTORICO PESO
// ==========================
router.put('/:id', updateHistoricoPeso);

// ==========================
//        DELETE HISTORICO PESO
// ==========================
router.delete('/:id', deleteHistoricoPeso);

module.exports = router;