// controllers/authController.js - Controlador de autenticação para FikiFit
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Registrar usuário
// @route   POST /api/auth/register
// @access  Público
const register = async (req, res) => {
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

    // Retorna dados do usuário
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      user_type: newUser.user_type,
      telefone: newUser.telefone,
      foto_perfil: newUser.foto_perfil
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// @desc    Autenticar usuário
// @route   POST /api/auth/login
// @access  Público
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação de entrada
    if (!email || !password) {
      return res.status(400).json({ msg: 'Por favor, forneça email e senha' });
    }

    // Obtém usuário do banco de dados
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Compara senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Retorna dados do usuário
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      telefone: user.telefone,
      foto_perfil: user.foto_perfil
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  login,
  register
};