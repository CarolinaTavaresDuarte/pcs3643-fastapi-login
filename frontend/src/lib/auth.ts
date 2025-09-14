import { Token, UserOut, api } from './api';

export const setTokens = (tokenData: Token) => {
  localStorage.setItem('access_token', tokenData.access_token);
  localStorage.setItem('token_type', tokenData.token_type);
};

export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = () => {
  clearTokens();
  window.location.href = '/login';
};

// Função para buscar dados do usuário atual
export const getCurrentUser = async (): Promise<UserOut | null> => {
  try {
    if (!isAuthenticated()) return null;
    return await api.getCurrentUser();
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    logout(); // Se não conseguir buscar o usuário, fazer logout
    return null;
  }
};