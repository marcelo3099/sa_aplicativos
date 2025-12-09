// models/Exercicio.js - Modelo de exercício para FikiFit
const { supabase } = require('../config/supabaseClient');

class Exercicio {
  constructor({
    id, nome, descricao, categoria, dificuldade, series, repeticoes, carga, 
    duracao, observacoes, treino_id
  }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.categoria = categoria; // força, cardio, etc.
    this.dificuldade = dificuldade; // fácil, moderado, difícil
    this.series = series;
    this.repeticoes = repeticoes;
    this.carga = carga; // em kg
    this.duracao = duracao; // em minutos
    this.observacoes = observacoes;
    this.treino_id = treino_id;
  }

  // Método para criar um novo exercício
  static async create(exercicioData) {
    const { data, error } = await supabase
      .from('exercicios')
      .insert([exercicioData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Exercicio(data);
  }

  // Método para encontrar exercício por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('exercicios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Exercício não encontrado
      }
      throw new Error(error.message);
    }

    return new Exercicio(data);
  }

  // Método para encontrar exercícios por treino
  static async findByTreinoId(treino_id) {
    const { data, error } = await supabase
      .from('exercicios')
      .select('*')
      .eq('treino_id', treino_id);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(exercicio => new Exercicio(exercicio));
  }

  // Método para atualizar exercício
  async update(updateData) {
    const { data, error } = await supabase
      .from('exercicios')
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

  // Método para deletar exercício
  async delete() {
    const { error } = await supabase
      .from('exercicios')
      .delete()
      .eq('id', this.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // Método para encontrar todos os exercícios
  static async findAll() {
    const { data, error } = await supabase
      .from('exercicios')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data.map(exercicio => new Exercicio(exercicio));
  }
}

module.exports = Exercicio;