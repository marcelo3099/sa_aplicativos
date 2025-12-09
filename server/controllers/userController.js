// controllers/userController.js - Controlador de usuários para FikiFit
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Obter todos os usuários
// @route   GET /api/users
// @access  Público
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter usuário por ID
// @route   GET /api/users/:id
// @access  Público
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Criar novo usuário
// @route   POST /api/users/
// @access  Público
const createUser = async (req, res) => {
  try {
    const {
      name, email, password, user_type, telefone, data_nascimento, altura, objetivo,
      especializacao, cref, descricao, experiencia_anos
    } = req.body;

    // Validação de entrada
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Por favor, preencha os campos obrigatórios: nome, email e senha' });
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Por favor, forneça um email válido' });
    }

    // Verificar se o usuário já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'Usuário com este email já existe' });
    }

    // Criptografar a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Preparar dados para criação
    const userData = {
      name,
      email,
      password: hashedPassword,
      user_type: user_type || 'aluno',
      telefone,
      data_nascimento,
      altura,
      objetivo,
      especializacao,
      cref,
      descricao,
      experiencia_anos
    };

    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Atualizar usuário
// @route   PUT /api/users/update/:id
// @access  Público
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Remover campos sensíveis que não devem ser atualizados diretamente
    delete updateData.password;
    delete updateData.email; // Para simplificar, email não pode ser alterado

    // Se uma nova senha for fornecida, criptografar
    if (req.body.newPassword) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(req.body.newPassword, saltRounds);
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    const updatedUser = await user.update(updateData);
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Excluir usuário
// @route   DELETE /api/users/:id
// @access  Público
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    await user.delete();
    res.json({ msg: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Obter usuários por tipo
// @route   GET /api/users/type/:user_type
// @access  Público
const getUsersByType = async (req, res) => {
  try {
    const { user_type } = req.params;

    if (user_type === 'professor') {
      const personalTrainers = await User.findPersonalTrainers();
      res.json(personalTrainers);
    } else if (user_type === 'aluno') {
      const alunos = await User.findAlunos();
      res.json(alunos);
    } else {
      return res.status(400).json({ msg: 'Tipo de usuário inválido. Use "professor" ou "aluno"' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersByType
};