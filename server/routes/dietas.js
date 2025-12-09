// routes/dietas.js - rotas para dietas
const express = require('express');
const router = express.Router();
const {
  getAllDietas,
  getDietaById,
  createDieta,
  updateDieta,
  deleteDieta,
  getDietasByAluno,
  getDietasByPersonal
} = require('../controllers/dietaController');

// ==========================
//        CREATE DIETA
// ==========================
router.post('/', createDieta);

// ==========================
//        LIST ALL DIETAS
// ==========================
router.get('/', getAllDietas);

// ==========================
//     GET DIETA BY ID
// ==========================
router.get('/:id', getDietaById);

// ==========================
//     GET DIETAS BY ALUNO
// ==========================
router.get('/aluno/:aluno_id', getDietasByAluno);

// ==========================
//     GET DIETAS BY PERSONAL
// ==========================
router.get('/personal/:personal_id', getDietasByPersonal);

// ==========================
//        UPDATE DIETA
// ==========================
router.put('/:id', updateDieta);

// ==========================
//        DELETE DIETA
// ==========================
router.delete('/:id', deleteDieta);

module.exports = router;