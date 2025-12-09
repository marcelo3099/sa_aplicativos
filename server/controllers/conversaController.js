// controllers/conversaController.js - Controlador de conversas para FikiFit
const Conversa = require('../models/Conversa');
const Mensagem = require('../models/Mensagem');

// @desc    Obter todas as conversas
// @route   GET /api/conversas
// @access  Público
const getAllConversas = async (req, res) => {
  try {
    const conversas = await Conversa.findAll();
    res.json(conversas);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter conversa por ID
// @route   GET /api/conversas/:id
// @access  Público
const getConversaById = async (req, res) => {
  try {
    const { id } = req.params;

    const conversa = await Conversa.findById(id);

    if (!conversa) {
      return res.status(404).json({ msg: 'Conversa não encontrada' });
    }

    res.json(conversa);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Criar nova conversa
// @route   POST /api/conversas
// @access  Público
const createConversa = async (req, res) => {
  try {
    const {
      aluno_id, professor_id
    } = req.body;

    // Validação de entrada
    if (!aluno_id || !professor_id) {
      return res.status(400).json({ msg: 'Por favor, forneça aluno_id e professor_id' });
    }

    // Verificar se já existe uma conversa entre esses usuários
    const existingConversa = await Conversa.findByAlunoAndProfessor(aluno_id, professor_id);
    if (existingConversa) {
      return res.status(400).json({ msg: 'Já existe uma conversa entre esses usuários' });
    }

    // Preparar dados para criação
    const conversaData = {
      aluno_id,
      professor_id
    };

    const novaConversa = await Conversa.create(conversaData);
    res.status(201).json(novaConversa);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Atualizar conversa
// @route   PUT /api/conversas/:id
// @access  Público
const updateConversa = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const conversa = await Conversa.findById(id);
    if (!conversa) {
      return res.status(404).json({ msg: 'Conversa não encontrada' });
    }

    const updatedConversa = await conversa.update(updateData);
    res.json(updatedConversa);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Excluir conversa
// @route   DELETE /api/conversas/:id
// @access  Público
const deleteConversa = async (req, res) => {
  try {
    const { id } = req.params;

    const conversa = await Conversa.findById(id);
    if (!conversa) {
      return res.status(404).json({ msg: 'Conversa não encontrada' });
    }

    await conversa.delete();
    res.json({ msg: 'Conversa deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter conversas por aluno
// @route   GET /api/conversas/aluno/:aluno_id
// @access  Público
const getConversasByAluno = async (req, res) => {
  try {
    const { aluno_id } = req.params;

    const conversas = await Conversa.findByAlunoId(aluno_id);
    res.json(conversas);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter conversas por professor
// @route   GET /api/conversas/professor/:professor_id
// @access  Público
const getConversasByProfessor = async (req, res) => {
  try {
    const { professor_id } = req.params;

    const conversas = await Conversa.findByProfessorId(professor_id);
    res.json(conversas);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter mensagens de uma conversa
// @route   GET /api/conversas/:id/mensagens
// @access  Público
const getMensagensByConversa = async (req, res) => {
  try {
    const { id } = req.params;

    const conversa = await Conversa.findById(id);
    if (!conversa) {
      return res.status(404).json({ msg: 'Conversa não encontrada' });
    }

    const mensagens = await conversa.getMensagens();
    res.json(mensagens);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Adicionar mensagem a uma conversa
// @route   POST /api/conversas/:id/mensagens
// @access  Público
const addMensagemToConversa = async (req, res) => {
  try {
    const { id } = req.params;
    const mensagemData = req.body;

    const conversa = await Conversa.findById(id);
    if (!conversa) {
      return res.status(404).json({ msg: 'Conversa não encontrada' });
    }

    const mensagem = await conversa.addMensagem(mensagemData);
    res.status(201).json(mensagem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllConversas,
  getConversaById,
  createConversa,
  updateConversa,
  deleteConversa,
  getConversasByAluno,
  getConversasByProfessor,
  getMensagensByConversa,
  addMensagemToConversa
};