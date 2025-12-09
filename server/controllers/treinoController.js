// controllers/treinoController.js - Controlador de treinos para FikiFit
const Treino = require('../models/Treino');
const Exercicio = require('../models/Exercicio');

// @desc    Obter todos os treinos
// @route   GET /api/treinos
// @access  Público
const getAllTreinos = async (req, res) => {
  try {
    const treinos = await Treino.findAll();
    res.json(treinos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter treino por ID
// @route   GET /api/treinos/:id
// @access  Público
const getTreinoById = async (req, res) => {
  try {
    const { id } = req.params;

    const treino = await Treino.findById(id);

    if (!treino) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    res.json(treino);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Criar novo treino
// @route   POST /api/treinos
// @access  Público
const createTreino = async (req, res) => {
  try {
    const {
      titulo, descricao, nivel, categoria, criador_id, aluno_id, observacoes
    } = req.body;

    // Validação de entrada
    if (!titulo || !criador_id || !aluno_id) {
      return res.status(400).json({ msg: 'Por favor, forneça título, ID do criador e ID do aluno' });
    }

    // Preparar dados para criação
    const treinoData = {
      titulo,
      descricao,
      nivel,
      categoria,
      criador_id,
      aluno_id,
      observacoes
    };

    const novoTreino = await Treino.create(treinoData);
    res.status(201).json(novoTreino);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Atualizar treino
// @route   PUT /api/treinos/:id
// @access  Público
const updateTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const treino = await Treino.findById(id);
    if (!treino) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    const updatedTreino = await treino.update(updateData);
    res.json(updatedTreino);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Excluir treino
// @route   DELETE /api/treinos/:id
// @access  Público
const deleteTreino = async (req, res) => {
  try {
    const { id } = req.params;

    const treino = await Treino.findById(id);
    if (!treino) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    await treino.delete();
    res.json({ msg: 'Treino deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter treinos por aluno
// @route   GET /api/treinos/aluno/:aluno_id
// @access  Público
const getTreinosByAluno = async (req, res) => {
  try {
    const { aluno_id } = req.params;

    const treinos = await Treino.findByAlunoId(aluno_id);
    res.json(treinos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter treinos por personal trainer
// @route   GET /api/treinos/personal/:personal_id
// @access  Público
const getTreinosByPersonal = async (req, res) => {
  try {
    const { personal_id } = req.params;

    const treinos = await Treino.findByPersonalId(personal_id);
    res.json(treinos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Adicionar exercício a um treino
// @route   POST /api/treinos/:id/exercicios
// @access  Público
const addExercicioToTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const exercicioData = req.body;

    const treino = await Treino.findById(id);
    if (!treino) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    const exercicio = await treino.addExercicio(exercicioData);
    res.status(201).json(exercicio);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter exercícios de um treino
// @route   GET /api/treinos/:id/exercicios
// @access  Público
const getExerciciosByTreino = async (req, res) => {
  try {
    const { id } = req.params;

    const treino = await Treino.findById(id);
    if (!treino) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    const exercicios = await treino.getExercicios();
    res.json(exercicios);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllTreinos,
  getTreinoById,
  createTreino,
  updateTreino,
  deleteTreino,
  getTreinosByAluno,
  getTreinosByPersonal,
  addExercicioToTreino,
  getExerciciosByTreino
};