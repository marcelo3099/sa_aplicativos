import axios from 'axios';
import API_CONFIG from '../../config/api';

// Configuração do cliente Axios
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação (quando implementado)
api.interceptors.request.use(
  (config) => {
    // Recupera o token do AsyncStorage (quando implementado)
    // const token = AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funções de autenticação
export const authAPI = {
  // Registrar usuário
  register: (userData) => api.post('/api/auth/register', userData),
  
  // Login de usuário
  login: (credentials) => api.post('/api/auth/login', credentials),
};

// Funções de usuário
export const userAPI = {
  // Obter todos os usuários
  getAllUsers: () => api.get('/api/users'),
  
  // Obter usuário por ID
  getUserById: (id) => api.get(`/api/users/${id}`),
  
  // Obter usuários por tipo
  getUsersByType: (userType) => api.get(`/api/users/type/${userType}`),
  
  // Atualizar usuário
  updateUser: (id, userData) => api.put(`/api/users/update/${id}`, userData),
};

// Funções de treino
export const treinoAPI = {
  // Obter todos os treinos
  getAllTreinos: () => api.get('/api/treinos'),
  
  // Obter treino por ID
  getTreinoById: (id) => api.get(`/api/treinos/${id}`),
  
  // Obter treinos por aluno
  getTreinosByAluno: (alunoId) => api.get(`/api/treinos/aluno/${alunoId}`),
  
  // Obter treinos por personal
  getTreinosByPersonal: (personalId) => api.get(`/api/treinos/personal/${personalId}`),
  
  // Criar treino
  createTreino: (treinoData) => api.post('/api/treinos', treinoData),
  
  // Atualizar treino
  updateTreino: (id, treinoData) => api.put(`/api/treinos/${id}`, treinoData),
  
  // Deletar treino
  deleteTreino: (id) => api.delete(`/api/treinos/${id}`),
  
  // Adicionar exercício a treino
  addExercicioToTreino: (id, exercicioData) => api.post(`/api/treinos/${id}/exercicios`, exercicioData),
  
  // Obter exercícios de treino
  getExerciciosByTreino: (id) => api.get(`/api/treinos/${id}/exercicios`),
};

// Funções de exercício
export const exercicioAPI = {
  // Obter todos os exercícios
  getAllExercicios: () => api.get('/api/exercicios'),
  
  // Obter exercício por ID
  getExercicioById: (id) => api.get(`/api/exercicios/${id}`),
  
  // Obter exercícios por treino
  getExerciciosByTreino: (treinoId) => api.get(`/api/exercicios/treino/${treinoId}`),
  
  // Criar exercício
  createExercicio: (exercicioData) => api.post('/api/exercicios', exercicioData),
  
  // Atualizar exercício
  updateExercicio: (id, exercicioData) => api.put(`/api/exercicios/${id}`, exercicioData),
  
  // Deletar exercício
  deleteExercicio: (id) => api.delete(`/api/exercicios/${id}`),
};

// Funções de dieta
export const dietaAPI = {
  // Obter todas as dietas
  getAllDietas: () => api.get('/api/dietas'),
  
  // Obter dieta por ID
  getDietaById: (id) => api.get(`/api/dietas/${id}`),
  
  // Obter dietas por aluno
  getDietasByAluno: (alunoId) => api.get(`/api/dietas/aluno/${alunoId}`),
  
  // Obter dietas por personal
  getDietasByPersonal: (personalId) => api.get(`/api/dietas/personal/${personalId}`),
  
  // Criar dieta
  createDieta: (dietaData) => api.post('/api/dietas', dietaData),
  
  // Atualizar dieta
  updateDieta: (id, dietaData) => api.put(`/api/dietas/${id}`, dietaData),
  
  // Deletar dieta
  deleteDieta: (id) => api.delete(`/api/dietas/${id}`),
};

// Funções de conversa
export const conversaAPI = {
  // Obter todas as conversas
  getAllConversas: () => api.get('/api/conversas'),
  
  // Obter conversa por ID
  getConversaById: (id) => api.get(`/api/conversas/${id}`),
  
  // Obter conversas por aluno
  getConversasByAluno: (alunoId) => api.get(`/api/conversas/aluno/${alunoId}`),
  
  // Obter conversas por personal
  getConversasByPersonal: (personalId) => api.get(`/api/conversas/professor/${personalId}`),
  
  // Criar conversa
  createConversa: (conversaData) => api.post('/api/conversas', conversaData),
  
  // Obter mensagens de conversa
  getMensagensByConversa: (id) => api.get(`/api/conversas/${id}/mensagens`),
  
  // Adicionar mensagem a conversa
  addMensagemToConversa: (id, mensagemData) => api.post(`/api/conversas/${id}/mensagens`, mensagemData),
};

// Funções de histórico de peso
export const historicoPesoAPI = {
  // Obter todo o histórico de peso
  getAllHistoricoPeso: () => api.get('/api/historico-peso'),
  
  // Obter registro de histórico por ID
  getHistoricoPesoById: (id) => api.get(`/api/historico-peso/${id}`),
  
  // Obter histórico de peso por aluno
  getHistoricoPesoByAluno: (alunoId) => api.get(`/api/historico-peso/aluno/${alunoId}`),
  
  // Criar registro de histórico de peso
  createHistoricoPeso: (historicoData) => api.post('/api/historico-peso', historicoData),
  
  // Atualizar registro de histórico de peso
  updateHistoricoPeso: (id, historicoData) => api.put(`/api/historico-peso/${id}`, historicoData),
  
  // Deletar registro de histórico de peso
  deleteHistoricoPeso: (id) => api.delete(`/api/historico-peso/${id}`),
};

export default api;