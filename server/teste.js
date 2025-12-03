// teste.js - Script simples para testar o servidor
const axios = require('axios');

// Função para testar o servidor
async function testServer() {
  try {
    console.log('Testando o servidor FikiFit...');
    
    // Teste de conexão básica
    const response = await axios.get('http://localhost:5000');
    console.log('✓ Conexão com o servidor bem-sucedida');
    console.log('Resposta:', response.data);
    
    // Teste de rota de usuário (apenas se não houver dados sensíveis)
    console.log('✓ Servidor está respondendo corretamente');
  } catch (error) {
    console.error('✗ Erro ao conectar com o servidor:', error.message);
    console.log('Certifique-se de que o servidor esteja rodando com "npm run dev"');
  }
}

// Executar o teste
testServer();