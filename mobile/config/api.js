// config/api.js - Configuração da API
const API_CONFIG = {
  // ATENÇÃO: Substitua este IP pelo IP do seu computador na rede local!
  // Para descobrir seu IP: abra cmd e digite "ipconfig"
  // Procure por "Endereço IPv4" na sua conexão ativa
  BASE_URL: 'http://10.3.119.150:5000', // IP atualizado conforme resultado do ipconfig

  // Para testar localmente com emulador Android Studio
  // BASE_URL: 'http://10.0.2.2:5000',

  // Para testar localmente com emulador iOS
  // BASE_URL: 'http://localhost:5000',

  // Outro IP comum para rede local
  // BASE_URL: 'http://192.168.1.100:5000',
};

export default API_CONFIG;