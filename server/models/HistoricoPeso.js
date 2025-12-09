// models/HistoricoPeso.js - Modelo de histórico de peso para FikiFit
const { supabase } = require('../config/supabaseClient');

class HistoricoPeso {
  constructor({
    id, aluno_id, peso, data_registro, observacoes
  }) {
    this.id = id;
    this.aluno_id = aluno_id; // ID do aluno
    this.peso = peso; // em kg
    this.data_registro = data_registro;
    this.observacoes = observacoes;
  }

  // Método para criar um novo registro de peso
  static async create(historicoData) {
    const { data, error } = await supabase
      .from('historico_peso')
      .insert([historicoData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new HistoricoPeso(data);
  }

  // Método para encontrar registro por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('historico_peso')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Registro não encontrado
      }
      throw new Error(error.message);
    }

    return new HistoricoPeso(data);
  }

  // Método para encontrar histórico de peso por aluno
  static async findByAlunoId(aluno_id) {
    const { data, error } = await supabase
      .from('historico_peso')
      .select('*')
      .eq('aluno_id', aluno_id)
      .order('data_registro', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(registro => new HistoricoPeso(registro));
  }

  // Método para atualizar registro
  async update(updateData) {
    const { data, error } = await supabase
      .from('historico_peso')
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

  // Método para deletar registro
  async delete() {
    const { error } = await supabase
      .from('historico_peso')
      .delete()
      .eq('id', this.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // Método para encontrar todos os registros de histórico de peso
  static async findAll() {
    const { data, error } = await supabase
      .from('historico_peso')
      .select('*')
      .order('data_registro', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(registro => new HistoricoPeso(registro));
  }
}

module.exports = HistoricoPeso;