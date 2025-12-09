// models/Dieta.js - Modelo de dieta para FikiFit
const { supabase } = require('../config/supabaseClient');

class Dieta {
  constructor({
    id, titulo, descricao, tipo_dieta, data_inicio, data_fim,
    criador_id, aluno_id, ativo, observacoes
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.tipo_dieta = tipo_dieta; // hipercalórica, hipocalórica, etc.
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
    this.criador_id = criador_id; // ID do personal trainer
    this.aluno_id = aluno_id; // ID do aluno para quem é a dieta
    this.ativo = ativo;
    this.observacoes = observacoes;
  }

  // Método para criar uma nova dieta
  static async create(dietaData) {
    const { data, error } = await supabase
      .from('dietas')
      .insert([dietaData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Dieta(data);
  }

  // Método para encontrar dieta por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Dieta não encontrada
      }
      throw new Error(error.message);
    }

    return new Dieta(data);
  }

  // Método para encontrar dietas por aluno
  static async findByAlunoId(aluno_id) {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .eq('aluno_id', aluno_id)
      .eq('ativo', true);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(dieta => new Dieta(dieta));
  }

  // Método para encontrar dietas por personal trainer
  static async findByPersonalId(personal_id) {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .eq('criador_id', personal_id);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(dieta => new Dieta(dieta));
  }

  // Método para atualizar dieta
  async update(updateData) {
    const { data, error } = await supabase
      .from('dietas')
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

  // Método para deletar dieta
  async delete() {
    const { error } = await supabase
      .from('dietas')
      .delete()
      .eq('id', this.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // Método para encontrar todas as dietas
  static async findAll() {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .eq('ativo', true);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(dieta => new Dieta(dieta));
  }

  // Método para obter as refeições de uma dieta
  async getRefeicoes() {
    const { data, error } = await supabase
      .from('refeicoes')
      .select('*')
      .eq('dieta_id', this.id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Método para adicionar refeição a uma dieta
  async addRefeicao(refeicaoData) {
    refeicaoData.dieta_id = this.id;
    const { data, error } = await supabase
      .from('refeicoes')
      .insert([refeicaoData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

module.exports = Dieta;