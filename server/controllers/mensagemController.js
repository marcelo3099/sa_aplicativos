// controllers/mensagemController.js - Controlador de mensagens para FikiFit
const Mensagem = require('../models/Mensagem');
const Conversa = require('../models/Conversa');

// @desc    Obter todas as mensagens
// @route   GET /api/mensagens
// @access  Público
const getAllMensagens = async (req, res) => {
  try {
    const mensagens = await Mensagem.findAll();
    res.json(mensagens);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter mensagem por ID
// @route   GET /api/mensagens/:id
// @access  Público
const getMensagemById = async (req, res) => {
  try {
    const { id } = req.params;

    const mensagem = await Mensagem.findById(id);

    if (!mensagem) {
      return res.status(404).json({ msg: 'Mensagem não encontrada' });
    }

    res.json(mensagem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Criar nova mensagem
// @route   POST /api/mensagens
// @access  Público
const createMensagem = async (req, res) => {
  try {
    const {
      conversa_id, remetente_id, conteudo, tipo_usuario
    } = req.body;

    // Validação de entrada
    if (!conversa_id || !remetente_id || !conteudo) {
      return res.status(400).json({ msg: 'Por favor, forneça conversa_id, remetente_id e conteúdo da mensagem' });
    }

    // Preparar dados para criação
    const mensagemData = {
      conversa_id,
      remetente_id,
      conteudo,
      tipo_usuario
    };

    const novaMensagem = await Mensagem.create(mensagemData);
    res.status(201).json(novaMensagem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Atualizar mensagem (por exemplo, marcar como lida)
// @route   PUT /api/mensagens/:id
// @access  Público
const updateMensagem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const mensagem = await Mensagem.findById(id);
    if (!mensagem) {
      return res.status(404).json({ msg: 'Mensagem não encontrada' });
    }

    const updatedMensagem = await mensagem.update(updateData);
    res.json(updatedMensagem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Excluir mensagem
// @route   DELETE /api/mensagens/:id
// @access  Público
const deleteMensagem = async (req, res) => {
  try {
    const { id } = req.params;

    const mensagem = await Mensagem.findById(id);
    if (!mensagem) {
      return res.status(404).json({ msg: 'Mensagem não encontrada' });
    }

    await mensagem.delete();
    res.json({ msg: 'Mensagem deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter mensagens por conversa
// @route   GET /api/mensagens/conversa/:conversa_id
// @access  Público
const getMensagensByConversa = async (req, res) => {
  try {
    const { conversa_id } = req.params;

    const mensagens = await Mensagem.findByConversaId(conversa_id);
    res.json(mensagens);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter mensagens por remetente
// @route   GET /api/mensagens/remetente/:remetente_id
// @access  Público
const getMensagensByRemetente = async (req, res) => {
  try {
    const { remetente_id } = req.params;

    const mensagens = await Mensagem.findByRemetenteId(remetente_id);
    res.json(mensagens);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllMensagens,
  getMensagemById,
  createMensagem,
  updateMensagem,
  deleteMensagem,
  getMensagensByConversa,
  getMensagensByRemetente
};