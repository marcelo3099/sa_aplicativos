// controllers/exercicioController.js - Controlador de exercícios para FikiFit
const Exercicio = require('../models/Exercicio');

// @desc    Obter todos os exercícios
// @route   GET /api/exercicios
// @access  Público
const getAllExercicios = async (req, res) => {
  try {
    const exercicios = await Exercicio.findAll();
    res.json(exercicios);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter exercício por ID
// @route   GET /api/exercicios/:id
// @access  Público
const getExercicioById = async (req, res) => {
  try {
    const { id } = req.params;

    const exercicio = await Exercicio.findById(id);

    if (!exercicio) {
      return res.status(404).json({ msg: 'Exercício não encontrado' });
    }

    res.json(exercicio);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Criar novo exercício
// @route   POST /api/exercicios
// @access  Público
const createExercicio = async (req, res) => {
  try {
    const {
      nome, descricao, categoria, dificuldade, series, repeticoes, carga, duracao, observacoes, treino_id
    } = req.body;

    // Validação de entrada
    if (!nome || !treino_id) {
      return res.status(400).json({ msg: 'Por favor, forneça nome e ID do treino' });
    }

    // Preparar dados para criação
    const exercicioData = {
      nome,
      descricao,
      categoria,
      dificuldade,
      series,
      repeticoes,
      carga,
      duracao,
      observacoes,
      treino_id
    };

    const novoExercicio = await Exercicio.create(exercicioData);
    res.status(201).json(novoExercicio);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Atualizar exercício
// @route   PUT /api/exercicios/:id
// @access  Público
const updateExercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const exercicio = await Exercicio.findById(id);
    if (!exercicio) {
      return res.status(404).json({ msg: 'Exercício não encontrado' });
    }

    const updatedExercicio = await exercicio.update(updateData);
    res.json(updatedExercicio);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Excluir exercício
// @route   DELETE /api/exercicios/:id
// @access  Público
const deleteExercicio = async (req, res) => {
  try {
    const { id } = req.params;

    const exercicio = await Exercicio.findById(id);
    if (!exercicio) {
      return res.status(404).json({ msg: 'Exercício não encontrado' });
    }

    await exercicio.delete();
    res.json({ msg: 'Exercício deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter exercícios por treino
// @route   GET /api/exercicios/treino/:treino_id
// @access  Público
const getExerciciosByTreino = async (req, res) => {
  try {
    const { treino_id } = req.params;

    const exercicios = await Exercicio.findByTreinoId(treino_id);
    res.json(exercicios);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllExercicios,
  getExercicioById,
  createExercicio,
  updateExercicio,
  deleteExercicio,
  getExerciciosByTreino
};