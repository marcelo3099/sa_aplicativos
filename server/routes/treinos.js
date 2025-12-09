// routes/treinos.js - rotas para treinos
const express = require('express');
const router = express.Router();
const {
  getAllTreinos,
  getTreinoById,
  createTreino,
  updateTreino,
  deleteTreino,
  getTreinosByAluno,
  getTreinosByPersonal,
  addExercicioToTreino,
  getExerciciosByTreino
} = require('../controllers/treinoController');

// ==========================
//        CREATE TREINO
// ==========================
router.post('/', createTreino);

// ==========================
//        LIST ALL TREINOS
// ==========================
router.get('/', getAllTreinos);

// ==========================
//     GET TREINO BY ID
// ==========================
router.get('/:id', getTreinoById);

// ==========================
//     GET TREINOS BY ALUNO
// ==========================
router.get('/aluno/:aluno_id', getTreinosByAluno);

// ==========================
//     GET TREINOS BY PERSONAL
// ==========================
router.get('/personal/:personal_id', getTreinosByPersonal);

// ==========================
//        UPDATE TREINO
// ==========================
router.put('/:id', updateTreino);

// ==========================
//        DELETE TREINO
// ==========================
router.delete('/:id', deleteTreino);

// ==========================
//     ADD EXERCICIO TO TREINO
// ==========================
router.post('/:id/exercicios', addExercicioToTreino);

// ==========================
//     GET EXERCICIOS BY TREINO
// ==========================
router.get('/:id/exercicios', getExerciciosByTreino);

module.exports = router;