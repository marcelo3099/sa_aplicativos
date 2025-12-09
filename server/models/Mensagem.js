// models/Mensagem.js - Modelo de mensagem para FikiFit
const { supabase } = require('../config/supabaseClient');

class Mensagem {
  constructor({
    id, conversa_id, remetente_id, conteudo, data_envio, lida, tipo_usuario
  }) {
    this.id = id;
    this.conversa_id = conversa_id;
    this.remetente_id = remetente_id; // ID do usuário que enviou a mensagem
    this.conteudo = conteudo;
    this.data_envio = data_envio;
    this.lida = lida;
    this.tipo_usuario = tipo_usuario; // 'aluno' ou 'professor'
  }

  // Método para criar uma nova mensagem
  static async create(mensagemData) {
    const { data, error } = await supabase
      .from('mensagens')
      .insert([mensagemData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Mensagem(data);
  }

  // Método para encontrar mensagem por ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Mensagem não encontrada
      }
      throw new Error(error.message);
    }

    return new Mensagem(data);
  }

  // Método para encontrar mensagens por conversa
  static async findByConversaId(conversa_id) {
    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .eq('conversa_id', conversa_id)
      .order('data_envio', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(mensagem => new Mensagem(mensagem));
  }

  // Método para encontrar mensagens por remetente
  static async findByRemetenteId(remetente_id) {
    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .eq('remetente_id', remetente_id);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(mensagem => new Mensagem(mensagem));
  }

  // Método para atualizar mensagem (por exemplo, marcar como lida)
  async update(updateData) {
    const { data, error } = await supabase
      .from('mensagens')
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

  // Método para deletar mensagem
  async delete() {
    const { error } = await supabase
      .from('mensagens')
      .delete()
      .eq('id', this.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  // Método para encontrar todas as mensagens
  static async findAll() {
    const { data, error } = await supabase
      .from('mensagens')
      .select('*')
      .order('data_envio', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(mensagem => new Mensagem(mensagem));
  }
}

module.exports = Mensagem;