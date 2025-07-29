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

export interface EmailTemplateFilters {
  searchTerm: string;
  selectedCategory: string;
}

export interface EmailTemplateStats {
  total: number;
  active: number;
  categories: number;
}

export interface EmailTemplateFormData {
  name: string;
  subject: string;
  content: string;
  description: string;
  status: string;
} 