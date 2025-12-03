// test-supabase.js - Script para testar a conexão com o Supabase
require('dotenv').config();
const { supabase } = require('./config/supabaseClient');

async function testConnection() {
  console.log('Testando conexão com o Supabase...');
  
  try {
    // Faz uma consulta simples para verificar a conexão
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Erro na conexão com Supabase:', error.message);
      return;
    }

    console.log('✅ Conexão com Supabase funcionando corretamente!');
    console.log('✅ O servidor pode se comunicar com o banco de dados');
    
    // Verifica se a tabela 'users' existe
    if (data !== null) {
      console.log('✅ Tabela "users" acessível');
    }
    
  } catch (err) {
    console.error('❌ Erro ao testar Supabase:', err.message);
  }
}

testConnection();