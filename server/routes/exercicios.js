// routes/exercicios.js - rotas para exercícios
const express = require('express');
const router = express.Router();
const {
  getAllExercicios,
  getExercicioById,
  createExercicio,
  updateExercicio,
  deleteExercicio,
  getExerciciosByTreino
} = require('../controllers/exercicioController');

// ==========================
//        CREATE EXERCICIO
// ==========================
router.post('/', createExercicio);

// ==========================
//        LIST ALL EXERCICIOS
// ==========================
router.get('/', getAllExercicios);

// ==========================
//     GET EXERCICIO BY ID
// ==========================
router.get('/:id', getExercicioById);

// ==========================
//     GET EXERCICIOS BY TREINO
// ==========================
router.get('/treino/:treino_id', getExerciciosByTreino);

// ==========================
//        UPDATE EXERCICIO
// ==========================
router.put('/:id', updateExercicio);

// ==========================
//        DELETE EXERCICIO
// ==========================
router.delete('/:id', deleteExercicio);

module.exports = router;