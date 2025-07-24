import { useState, useCallback } from 'react'
import { type EmailTemplate } from '@/types'
import { generateId } from '@/utils'

const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Newsletter tygodniowy',
    subject: 'Tygodniowe podsumowanie - {{company_name}}',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Witaj {{first_name}}!</h1>
        <p>Dziękujemy za zainteresowanie naszymi aktualnościami.</p>
        <p>W tym tygodniu przygotowaliśmy dla Ciebie:</p>
        <ul>
          <li>Najnowsze produkty</li>
          <li>Specjalne oferty</li>
          <li>Przydatne wskazówki</li>
        </ul>
        <p>Pozdrawiamy,<br>Zespół {{company_name}}</p>
      </div>
    `,
    isActive: true,
    category: 'newsletter',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Oferta specjalna',
    subject: 'Specjalna oferta tylko dla Ciebie!',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e74c3c;">SPECJALNA OFERTA!</h1>
        <p>Drogi {{first_name}},</p>
        <p>Przygotowaliśmy dla Ciebie wyjątkową ofertę z rabatem 20%!</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2>Kod rabatowy: WELCOME20</h2>
          <p>Ważny do końca miesiąca</p>
        </div>
        <p>Nie przegap tej okazji!</p>
        <p>Pozdrawiamy,<br>Zespół {{company_name}}</p>
      </div>
    `,
    isActive: true,
    category: 'promotional',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '3',
    name: 'Potwierdzenie zamówienia',
    subject: 'Potwierdzenie zamówienia #{{order_number}}',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #27ae60;">Dziękujemy za zamówienie!</h1>
        <p>Drogi {{first_name}},</p>
        <p>Potwierdzamy otrzymanie Twojego zamówienia numer <strong>#{{order_number}}</strong></p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Szczegóły zamówienia:</h3>
          <p>Data: {{order_date}}</p>
          <p>Kwota: {{order_total}}</p>
          <p>Status: {{order_status}}</p>
        </div>
        <p>Będziemy informować Cię o statusie realizacji.</p>
        <p>Pozdrawiamy,<br>Zespół {{company_name}}</p>
      </div>
    `,
    isActive: true,
    category: 'transactional',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
]

export const useEmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(MOCK_EMAIL_TEMPLATES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addEmailTemplate = useCallback((template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    
    try {
      const newTemplate: EmailTemplate = {
        ...template,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      setEmailTemplates(prev => [...prev, newTemplate])
    } catch (err) {
      setError('Błąd podczas dodawania szablonu')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateEmailTemplate = useCallback((id: string, updates: Partial<EmailTemplate>) => {
    setLoading(true)
    setError(null)
    
    try {
      setEmailTemplates(prev => 
        prev.map(template => 
          template.id === id 
            ? { ...template, ...updates, updatedAt: new Date() }
            : template
        )
      )
    } catch (err) {
      setError('Błąd podczas aktualizacji szablonu')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteEmailTemplate = useCallback((id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      setEmailTemplates(prev => prev.filter(template => template.id !== id))
    } catch (err) {
      setError('Błąd podczas usuwania szablonu')
    } finally {
      setLoading(false)
    }
  }, [])

  const getEmailTemplateById = useCallback((id: string) => {
    return emailTemplates.find(template => template.id === id)
  }, [emailTemplates])

  const searchEmailTemplates = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return emailTemplates.filter(template => 
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.subject.toLowerCase().includes(lowercaseQuery) ||
      template.category.toLowerCase().includes(lowercaseQuery)
    )
  }, [emailTemplates])

  const getEmailTemplatesByCategory = useCallback((category: EmailTemplate['category']) => {
    return emailTemplates.filter(template => template.category === category)
  }, [emailTemplates])

  const getActiveEmailTemplates = useCallback(() => {
    return emailTemplates.filter(template => template.isActive)
  }, [emailTemplates])

  const toggleTemplateStatus = useCallback((id: string) => {
    setEmailTemplates(prev => 
      prev.map(template => 
        template.id === id 
          ? { ...template, isActive: !template.isActive, updatedAt: new Date() }
          : template
      )
    )
  }, [])

  return {
    emailTemplates,
    loading,
    error,
    addEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
    getEmailTemplateById,
    searchEmailTemplates,
    getEmailTemplatesByCategory,
    getActiveEmailTemplates,
    toggleTemplateStatus,
  }
} 