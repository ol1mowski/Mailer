import { toast } from 'react-hot-toast';

export const API_BASE_URL = 'http://localhost:8080/api';

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
      credentials: 'include',
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

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {  
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

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

export interface DashboardStats {
  sentEmails: number;
  contacts: number;
  openRate: number;
  templates: number;
}

export interface RecentActivity {
  id: number;
  type: string;
  description: string;
  status: string;
  timestamp: string;
}

export const dashboardApi = {
  getStats: () => 
    apiClient.get<DashboardStats>('/dashboard/stats'),
  
  getRecentActivities: () => 
    apiClient.get<RecentActivity[]>('/dashboard/activities'),
};

export interface Contact {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  status: string;
  tags: string[];
  createdAt: string;
}

export interface ContactStats {
  total: number;
  active: number;
  vip: number;
  inactive: number;
  withPhone: number;
  withCompany: number;
}

export const contactApi = {
  getStats: () => 
    apiClient.get<ContactStats>('/contacts/stats'),
  
  getAllContacts: () => 
    apiClient.get<Contact[]>('/contacts'),
}; 