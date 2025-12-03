// controllers/authController.js - usando Supabase diretamente como nas rotas
const { supabase } = require('../config/supabaseClient');
const bcrypt = require('bcryptjs');

// @desc    Registrar usuário
// @route   POST /api/auth/register
// @access  Público
const register = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // Verifica se o usuário já existe usando Supabase
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 significa que nenhum registro foi encontrado, o que é esperado
      return res.status(500).json({ error: fetchError.message });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Criptografa a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Cria usuário com tipo (aluno ou personal trainer) usando Supabase
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          user_type: userType || 'aluno'
        }
      ])
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    // Retorna dados do usuário sem token JWT
    res.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      userType: newUser.user_type
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// @desc    Autenticar usuário
// @route   POST /api/auth/login
// @access  Público
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Obtém usuário do banco de dados usando Supabase
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !user) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    // Compara senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    // Retorna dados do usuário em vez de token
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.user_type
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// @desc    Obter usuário autenticado (não necessário sem JWT)
// @route   GET /api/auth
// @access  Público (não requer token)
const getAuthUser = async (req, res) => {
  try {
    // Agora esta rota não faz sentido sem JWT, então podemos removê-la ou adaptá-la
    // Por enquanto, retornaremos um erro para indicar que esta rota é obsoleta
    res.status(404).json({ msg: 'Rota não suportada sem sistema JWT' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

module.exports = {
  login,
  register,
  getAuthUser
};