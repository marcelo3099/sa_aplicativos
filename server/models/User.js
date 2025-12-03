// models/User.js - Modelo de usuário simplificado
const { supabase } = require('../config/supabaseClient');

class User {
  constructor({ id, name, email, password, user_type }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.user_type = user_type;
    this.created_at = new Date();
  }

  // Este modelo simplificado pode ser usado para operações básicas
  // mas as funções principais continuam nos controllers
}

module.exports = User;