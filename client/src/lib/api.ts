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

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data;
      } else {
        return {} as T;
      }
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
}

export interface User {
  id: number;
  email: string;
  firstName: string;  
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
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
  status: string;
  tags: string[];
  createdAt: string;
}

export interface ContactStats {
  total: number;
  active: number;
  vip: number;
  inactive: number;
}

export const contactApi = {
  getStats: () => 
    apiClient.get<ContactStats>('/contacts/stats'),
  
  getAllContacts: () => 
    apiClient.get<Contact[]>('/contacts'),
    
  getAvailableTags: () =>
    apiClient.get<string[]>('/contacts/tags'),
    
  createContact: (data: CreateContactRequest) =>
    apiClient.post<Contact>('/contacts', data),
    
  updateContact: (id: number, data: UpdateContactRequest) =>
    apiClient.put<Contact>(`/contacts/${id}`, data),
    
  deleteContact: (id: number) =>
    apiClient.delete(`/contacts/${id}`),
    
  importContacts: (data: ImportContactsRequest) =>
    apiClient.post<Contact[]>('/contacts/import', data),
};

export interface CreateContactRequest {
  email: string;
  firstName: string;
  tags?: string[];
  status?: string;
}

export interface UpdateContactRequest {
  email: string;
  firstName: string;
  tags?: string[];
  status?: string;
}

export interface ImportContactsRequest {
  contacts: CreateContactRequest[];
} 

export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmailTemplateRequest {
  name: string;
  subject: string;
  content: string;
  description?: string;
  status?: string;
}

export interface UpdateEmailTemplateRequest {
  name: string;
  subject: string;
  content: string;
  description?: string;
  status?: string;
}

export const emailTemplateApi = {
  getAllTemplates: () => 
    apiClient.get<EmailTemplate[]>('/email-templates'),
    
  createTemplate: (data: CreateEmailTemplateRequest) =>
    apiClient.post<EmailTemplate>('/email-templates', data),
    
  updateTemplate: (id: number, data: UpdateEmailTemplateRequest) =>
    apiClient.put<EmailTemplate>(`/email-templates/${id}`, data),
    
  deleteTemplate: (id: number) =>
    apiClient.delete(`/email-templates/${id}`),
    
  duplicateTemplate: (id: number) =>
    apiClient.post<EmailTemplate>(`/email-templates/${id}/duplicate`),
    
  toggleTemplateStatus: (id: number) =>
    apiClient.post<EmailTemplate>(`/email-templates/${id}/toggle-status`),
};

export interface Campaign {
  id: number;
  name: string;
  subject: string;
  content: string;
  description: string;
  status: string;
  scheduledAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  totalRecipients: number;
  sentEmails: number;
  openedEmails: number;
  clickedEmails: number;
  createdAt: string;
  updatedAt: string;
  template: EmailTemplate | null;
  recipients: Contact[] | null;
}

export interface CreateCampaignRequest {
  name: string;
  subject: string;
  content: string;
  description?: string;
  status: string;
  scheduledAt?: string;
  templateId?: number;
  recipientIds?: number[];
}

export interface UpdateCampaignRequest {
  name: string;
  subject: string;
  content: string;
  description?: string;
  status?: string;
  scheduledAt?: string;
  templateId?: number;
  recipientIds?: number[];
}

export const campaignApi = {
  getAllCampaigns: () => 
    apiClient.get<Campaign[]>('/campaigns'),
    
  createCampaign: (data: CreateCampaignRequest) =>
    apiClient.post<Campaign>('/campaigns', data),
    
  updateCampaign: (id: number, data: UpdateCampaignRequest) =>
    apiClient.put<Campaign>(`/campaigns/${id}`, data),
    
  deleteCampaign: (id: number) =>
    apiClient.delete(`/campaigns/${id}`),
    
  startCampaign: (id: number) =>
    apiClient.post<Campaign>(`/campaigns/${id}/start`),
    
  pauseCampaign: (id: number) =>
    apiClient.post<Campaign>(`/campaigns/${id}/pause`),
    
  completeCampaign: (id: number) =>
    apiClient.post<Campaign>(`/campaigns/${id}/complete`),
}; 

export interface AnalyticsData {
  totalEmails: number;
  totalRecipients: number;
  totalOpens: number;
  totalClicks: number;
  averageOpenRate: number;
  averageClickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}

export interface CampaignPerformance {
  name: string;
  sent: number;
  opened: number;
  clicked: number;
  openRate: number;
  clickRate: number;
}

export interface MonthlyData {
  month: string;
  emails: number;
  opens: number;
  clicks: number;
}

export interface BestHours {
  timeRange: string;
  percentage: number;
}

export interface TrendData {
  metric: string;
  change: number;
  isPositive: boolean;
}

export interface ExportDataRequest {
  period: string;
  format: string;
}

export const analyticsApi = {
  getAnalytics: (period: string = '30d') => 
    apiClient.get<AnalyticsData>(`/analytics?period=${period}`),
    
  getCampaignPerformance: (period: string = '30d') =>
    apiClient.get<CampaignPerformance[]>(`/analytics/campaign-performance?period=${period}`),
    
  getMonthlyData: (period: string = '30d') =>
    apiClient.get<MonthlyData[]>(`/analytics/monthly-data?period=${period}`),
    
  getBestHours: () =>
    apiClient.get<BestHours[]>('/analytics/best-hours'),
    
  getTrends: (period: string = '30d') =>
    apiClient.get<TrendData[]>(`/analytics/trends?period=${period}`),
    
  exportData: async (data: ExportDataRequest): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/analytics/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Błąd eksportu danych');
    }

    if (data.format.toLowerCase() === 'xml') {
      // Pobierz plik XML
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics_${data.period}.xml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      // Dla innych formatów zwróć tekst
      const result = await response.text();
      console.log('Export result:', result);
    }
  },
}; 