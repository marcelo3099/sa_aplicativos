// controllers/dietaController.js - Controlador de dietas para FikiFit
const Dieta = require('../models/Dieta');

// @desc    Obter todas as dietas
// @route   GET /api/dietas
// @access  Público
const getAllDietas = async (req, res) => {
  try {
    const dietas = await Dieta.findAll();
    res.json(dietas);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter dieta por ID
// @route   GET /api/dietas/:id
// @access  Público
const getDietaById = async (req, res) => {
  try {
    const { id } = req.params;

    const dieta = await Dieta.findById(id);

    if (!dieta) {
      return res.status(404).json({ msg: 'Dieta não encontrada' });
    }

    res.json(dieta);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Criar nova dieta
// @route   POST /api/dietas
// @access  Público
const createDieta = async (req, res) => {
  try {
    const {
      titulo, descricao, tipo_dieta, data_inicio, data_fim, criador_id, aluno_id, observacoes
    } = req.body;

    // Validação de entrada
    if (!titulo || !data_inicio || !criador_id || !aluno_id) {
      return res.status(400).json({ msg: 'Por favor, forneça título, data de início, ID do criador e ID do aluno' });
    }

    // Preparar dados para criação
    const dietaData = {
      titulo,
      descricao,
      tipo_dieta,
      data_inicio,
      data_fim,
      criador_id,
      aluno_id,
      observacoes
    };

    const novaDieta = await Dieta.create(dietaData);
    res.status(201).json(novaDieta);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Atualizar dieta
// @route   PUT /api/dietas/:id
// @access  Público
const updateDieta = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const dieta = await Dieta.findById(id);
    if (!dieta) {
      return res.status(404).json({ msg: 'Dieta não encontrada' });
    }

    const updatedDieta = await dieta.update(updateData);
    res.json(updatedDieta);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Excluir dieta
// @route   DELETE /api/dietas/:id
// @access  Público
const deleteDieta = async (req, res) => {
  try {
    const { id } = req.params;

    const dieta = await Dieta.findById(id);
    if (!dieta) {
      return res.status(404).json({ msg: 'Dieta não encontrada' });
    }

    await dieta.delete();
    res.json({ msg: 'Dieta deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter dietas por aluno
// @route   GET /api/dietas/aluno/:aluno_id
// @access  Público
const getDietasByAluno = async (req, res) => {
  try {
    const { aluno_id } = req.params;

    const dietas = await Dieta.findByAlunoId(aluno_id);
    res.json(dietas);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter dietas por personal trainer
// @route   GET /api/dietas/personal/:personal_id
// @access  Público
const getDietasByPersonal = async (req, res) => {
  try {
    const { personal_id } = req.params;

    const dietas = await Dieta.findByPersonalId(personal_id);
    res.json(dietas);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllDietas,
  getDietaById,
  createDieta,
  updateDieta,
  deleteDieta,
  getDietasByAluno,
  getDietasByPersonal
};