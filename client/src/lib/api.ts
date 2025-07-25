import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
  success: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Ważne dla HTTP-only cookies
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          message: 'Wystąpił błąd podczas komunikacji z serwerem',
          success: false,
        }));

        // Obsługa błędów walidacji
        if (response.status === 400 && errorData.errors) {
          const errorMessages = Object.values(errorData.errors).join(', ');
          throw new Error(errorMessages);
        }

        throw new Error(errorData.message || `Błąd ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      }
      
      const errorMessage = 'Wystąpił nieoczekiwany błąd';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  // GET request
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  // POST request
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Typy dla autentykacji
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

// API endpoints
export const authApi = {
  login: (data: LoginRequest) => 
    apiClient.post<AuthResponse>('/auth/login', data),
  
  register: (data: RegisterRequest) => 
    apiClient.post<AuthResponse>('/auth/register', data),
  
  logout: () => 
    apiClient.post<AuthResponse>('/auth/logout'),
  
  getCurrentUser: () => 
    apiClient.get<AuthResponse>('/auth/me'),
}; 