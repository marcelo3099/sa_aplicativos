// models/Treino.js - Modelo de treino para FikiFit
const { supabase } = require('../config/supabaseClient');
const User = require('./User');

class Treino {
  constructor({
    id, titulo, descricao, nivel, categoria, data_criacao, data_atualizacao,
    criador_id, aluno_id, ativo, observacoes
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.nivel = nivel; // iniciante, intermediário, avançado
    this.categoria = categoria; // peito, costas, perna, etc.
    this.data_criacao = data_criacao;
    this.data_atualizacao = data_atualizacao;
    this.criador_id = criador_id; // ID do personal trainer
    this.aluno_id = aluno_id; // ID do aluno para quem é o treino
    this.ativo = ativo;
    this.observacoes = observacoes;
  }

  // Método para criar um novo treino
  static async create(treinoData) {
    const { data, error } = await supabase
      .from('treinos')
      .insert([treinoData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Treino(data);
  }

  // Método para encontrar treino por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('treinos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Treino não encontrado
      }
      throw new Error(error.message);
    }

    return new Treino(data);
  }

  // Método para encontrar treinos por aluno
  static async findByAlunoId(aluno_id) {
    const { data, error } = await supabase
      .from('treinos')
      .select('*')
      .eq('aluno_id', aluno_id)
      .eq('ativo', true);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(treino => new Treino(treino));
  }

  // Método para encontrar treinos por personal trainer
  static async findByPersonalId(personal_id) {
    const { data, error } = await supabase
      .from('treinos')
      .select('*')
      .eq('criador_id', personal_id);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(treino => new Treino(treino));
  }

  // Método para atualizar treino
  async update(updateData) {
    const { data, error } = await supabase
      .from('treinos')
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

  // Método para deletar treino
  async delete() {
    const { error } = await supabase
      .from('treinos')
      .delete()
      .eq('id', this.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // Método para encontrar todos os treinos
  static async findAll() {
    const { data, error } = await supabase
      .from('treinos')
      .select('*')
      .eq('ativo', true);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(treino => new Treino(treino));
  }

  // Método para obter os exercícios de um treino
  async getExercicios() {
    const { data, error } = await supabase
      .from('exercicios')
      .select('*')
      .eq('treino_id', this.id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Método para adicionar exercício a um treino
  async addExercicio(exercicioData) {
    exercicioData.treino_id = this.id;
    const { data, error } = await supabase
      .from('exercicios')
      .insert([exercicioData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

module.exports = Treino;