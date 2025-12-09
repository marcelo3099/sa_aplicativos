import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, userAPI } from '../services/api';

// Estado inicial
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  userType: null, // 'aluno' ou 'professor'
};

// Tipos de ação
const SET_USER = 'SET_USER';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';
const SET_LOADING = 'SET_LOADING';

// Criar o contexto
const AuthContext = createContext();

// Reducer para gerenciamento de estado
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        userType: action.payload?.user_type || null,
        loading: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        userType: action.payload.user?.user_type || null,
        loading: false,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userType: null,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userType: null,
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Carregar usuário do AsyncStorage ao iniciar
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        dispatch({ type: SET_USER, payload: user });
      } else {
        dispatch({ type: SET_LOADING, payload: false });
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const response = await authAPI.login({ email, password });
      const user = response.data;

      // Armazenar usuário no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: LOGIN_SUCCESS, payload: { user } });
      return { success: true, user };
    } catch (error) {
      console.error('Erro no login:', error);
      const errorMessage = error.response?.data?.msg || 'Credenciais inválidas';
      dispatch({ type: LOGIN_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Função de registro
  const register = async (userData) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const response = await authAPI.register(userData);
      const user = response.data;

      // Armazenar usuário no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: LOGIN_SUCCESS, payload: { user } });
      return { success: true, user };
    } catch (error) {
      console.error('Erro no registro:', error);
      const errorMessage = error.response?.data?.msg || 'Erro ao registrar usuário';
      dispatch({ type: LOGIN_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Função para atualizar informações do usuário
  const updateUser = async (userData) => {
    try {
      // Atualizar no backend
      const response = await userAPI.updateUser(state.user.id, userData);
      const updatedUser = response.data;

      // Atualizar no estado e no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: SET_USER, payload: updatedUser });

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { success: false, error: error.message };
    }
  };

  const contextValue = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};