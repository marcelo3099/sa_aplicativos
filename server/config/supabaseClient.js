// config/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validar variáveis
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ SUPABASE_URL ou SUPABASE_ANON_KEY faltando no .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase conectado!");

module.exports = { supabase };
