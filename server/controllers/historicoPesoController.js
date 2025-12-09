// controllers/historicoPesoController.js - Controlador de histórico de peso para FikiFit
const HistoricoPeso = require('../models/HistoricoPeso');

// @desc    Obter todos os registros de histórico de peso
// @route   GET /api/historico-peso
// @access  Público
const getAllHistoricoPeso = async (req, res) => {
  try {
    const registros = await HistoricoPeso.findAll();
    res.json(registros);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter registro de histórico de peso por ID
// @route   GET /api/historico-peso/:id
// @access  Público
const getHistoricoPesoById = async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await HistoricoPeso.findById(id);

    if (!registro) {
      return res.status(404).json({ msg: 'Registro de histórico de peso não encontrado' });
    }

    res.json(registro);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Criar novo registro de histórico de peso
// @route   POST /api/historico-peso
// @access  Público
const createHistoricoPeso = async (req, res) => {
  try {
    const {
      aluno_id, peso, observacoes
    } = req.body;

    // Validação de entrada
    if (!aluno_id || !peso) {
      return res.status(400).json({ msg: 'Por favor, forneça aluno_id e peso' });
    }

    // Preparar dados para criação
    const historicoData = {
      aluno_id,
      peso,
      observacoes
    };

    const novoRegistro = await HistoricoPeso.create(historicoData);
    res.status(201).json(novoRegistro);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Atualizar registro de histórico de peso
// @route   PUT /api/historico-peso/:id
// @access  Público
const updateHistoricoPeso = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const registro = await HistoricoPeso.findById(id);
    if (!registro) {
      return res.status(404).json({ msg: 'Registro de histórico de peso não encontrado' });
    }

    const updatedRegistro = await registro.update(updateData);
    res.json(updatedRegistro);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Excluir registro de histórico de peso
// @route   DELETE /api/historico-peso/:id
// @access  Público
const deleteHistoricoPeso = async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await HistoricoPeso.findById(id);
    if (!registro) {
      return res.status(404).json({ msg: 'Registro de histórico de peso não encontrado' });
    }

    await registro.delete();
    res.json({ msg: 'Registro de histórico de peso deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter histórico de peso por aluno
// @route   GET /api/historico-peso/aluno/:aluno_id
// @access  Público
const getHistoricoPesoByAluno = async (req, res) => {
  try {
    const { aluno_id } = req.params;

    const registros = await HistoricoPeso.findByAlunoId(aluno_id);
    res.json(registros);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllHistoricoPeso,
  getHistoricoPesoById,
  createHistoricoPeso,
  updateHistoricoPeso,
  deleteHistoricoPeso,
  getHistoricoPesoByAluno
};