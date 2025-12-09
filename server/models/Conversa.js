// models/Conversa.js - Modelo de conversa para FikiFit
const { supabase } = require('../config/supabaseClient');
const Mensagem = require('./Mensagem');

class Conversa {
  constructor({
    id, aluno_id, professor_id, data_inicio, ultima_mensagem, status
  }) {
    this.id = id;
    this.aluno_id = aluno_id;
    this.professor_id = professor_id;
    this.data_inicio = data_inicio;
    this.ultima_mensagem = ultima_mensagem;
    this.status = status; // ativa, inativa
  }

  // Método para criar uma nova conversa
  static async create(conversaData) {
    const { data, error } = await supabase
      .from('conversas')
      .insert([conversaData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Conversa(data);
  }

  // Método para encontrar conversa por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('conversas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Conversa não encontrada
      }
      throw new Error(error.message);
    }

    return new Conversa(data);
  }

  // Método para encontrar conversa entre aluno e professor
  static async findByAlunoAndProfessor(aluno_id, professor_id) {
    const { data, error } = await supabase
      .from('conversas')
      .select('*')
      .eq('aluno_id', aluno_id)
      .eq('professor_id', professor_id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Conversa não encontrada
      }
      throw new Error(error.message);
    }

    return new Conversa(data);
  }

  // Método para encontrar conversas por aluno
  static async findByAlunoId(aluno_id) {
    const { data, error } = await supabase
      .from('conversas')
      .select('*')
      .eq('aluno_id', aluno_id);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(conversa => new Conversa(conversa));
  }

  // Método para encontrar conversas por professor
  static async findByProfessorId(professor_id) {
    const { data, error } = await supabase
      .from('conversas')
      .select('*')
      .eq('professor_id', professor_id);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(conversa => new Conversa(conversa));
  }

  // Método para atualizar conversa
  async update(updateData) {
    const { data, error } = await supabase
      .from('conversas')
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

  // Método para deletar conversa
  async delete() {
    const { error } = await supabase
      .from('conversas')
      .delete()
      .eq('id', this.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // Método para encontrar todas as conversas
  static async findAll() {
    const { data, error } = await supabase
      .from('conversas')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data.map(conversa => new Conversa(conversa));
  }

  // Método para obter mensagens da conversa
  async getMensagens() {
    return await Mensagem.findByConversaId(this.id);
  }

  // Método para adicionar mensagem à conversa
  async addMensagem(mensagemData) {
    mensagemData.conversa_id = this.id;
    return await Mensagem.create(mensagemData);
  }
}

module.exports = Conversa;