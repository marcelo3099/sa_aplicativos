// models/User.js - Modelo de usuário completo para FikiFit
const { supabase } = require('../config/supabaseClient');

class User {
  constructor({
    id, name, email, password, user_type, telefone, foto_perfil,
    data_nascimento, altura, objetivo, especializacao, cref, descricao, experiencia_anos
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.user_type = user_type; // 'aluno' ou 'professor'
    this.telefone = telefone;
    this.foto_perfil = foto_perfil;
    // Campos específicos para aluno
    this.data_nascimento = data_nascimento;
    this.altura = altura;
    this.objetivo = objetivo;
    // Campos específicos para professor
    this.especializacao = especializacao;
    this.cref = cref;
    this.descricao = descricao;
    this.experiencia_anos = experiencia_anos;
    this.created_at = new Date();
  }

  // Método para criar um novo usuário
  static async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new User(data);
  }

  // Método para encontrar usuário por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Usuário não encontrado
      }
      throw new Error(error.message);
    }

    return new User(data);
  }

  // Método para encontrar usuário por email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Usuário não encontrado
      }
      throw new Error(error.message);
    }

    return new User(data);
  }

  // Método para atualizar usuário
  async update(updateData) {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', this.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    Object.assign(this, data);
    return this;
  }

  // Método para deletar usuário
  async delete() {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', this.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // Método para encontrar todos os usuários
  static async findAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data.map(user => new User(user));
  }

  // Método para encontrar personais trainers
  static async findPersonalTrainers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', 'professor');

    if (error) {
      throw new Error(error.message);
    }

    return data.map(user => new User(user));
  }

  // Método para encontrar alunos
  static async findAlunos() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', 'aluno');

    if (error) {
      throw new Error(error.message);
    }

    return data.map(user => new User(user));
  }
}

module.exports = User;