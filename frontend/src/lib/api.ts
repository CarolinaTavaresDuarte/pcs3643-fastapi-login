const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface UserOut {
  id: number;
  email: string;
  name: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Add auth header if token exists
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      let errorMessage = 'Erro na requisição';
      
      try {
        const errorData = JSON.parse(error);
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        errorMessage = error || `HTTP ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async healthCheck(): Promise<string> {
    return this.request('/ping');
  }

  async login(credentials: LoginRequest): Promise<Token> {
    return this.request<Token>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<{ message: string }> {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<UserOut> {
    return this.request<UserOut>('/me');
  }
}

export const api = new ApiClient();