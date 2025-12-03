// controllers/userController.js - usando Supabase diretamente como nas rotas
const { supabase } = require('../config/supabaseClient');
const bcrypt = require('bcryptjs');

// @desc    Obter todos os usuários
// @route   GET /api/users
// @access  Público
const getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      return res.status(500).json({ msg: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// @desc    Obter usuário por ID
// @route   GET /api/users/:id
// @access  Público
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
      return res.status(500).json({ msg: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// @desc    Criar novo usuário
// @route   POST /api/users/
// @access  Público
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação de entrada simples
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios' });
    }

    // Validação simples de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Por favor, forneça um email válido' });
    }

    // Verificar se o usuário já existe
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 significa que nenhum registro foi encontrado, o que é esperado
      return res.status(500).json({ msg: fetchError.message });
    }

    if (existingUser) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criptografa a senha antes de salvar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          user_type: 'aluno' // Valor padrão
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ msg: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// @desc    Atualizar usuário
// @route   PUT /api/users/:id
// @access  Público
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, userType } = req.body;

    // Validação simples de formato de email se for fornecido
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: 'Por favor, forneça um email válido' });
      }
    }

    // Validação de senha se for fornecida
    if (password && password.length < 6) {
      return res.status(400).json({ msg: 'A senha deve ter pelo menos 6 caracteres' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      // Criptografa a senha antes de atualizar
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }
    if (userType) updateData.user_type = userType;

    // Verificar se há dados para atualizar
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ msg: 'Forneça pelo menos um campo para atualizar' });
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ msg: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// @desc    Excluir usuário
// @route   DELETE /api/users/:id
// @access  Público
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ msg: error.message });
    }

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

const postaUser = async (req, res) => {
  try {
    const userData = req.body;

    // Validação básica
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: 'Dados do usuário são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      // 🛑 Ocorreu um erro na requisição
      console.error('Erro ao postar usuário:', error.message);
      return res.status(500).json({ msg: error.message });
    }

    // ✅ Requisição bem-sucedida
    console.log('Usuário criado com sucesso:', data);
    res.status(201).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};




module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  postaUser
};