import { z } from 'zod'

export const contactSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  firstName: z.string().min(1, 'Imię jest wymagane').max(50, 'Imię jest za długie'),
  lastName: z.string().min(1, 'Nazwisko jest wymagane').max(50, 'Nazwisko jest za długie'),
  company: z.string().optional(),
  phone: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isSubscribed: z.boolean().default(true),
})

export const mailingListSchema = z.object({
  name: z.string().min(1, 'Nazwa listy jest wymagana').max(100, 'Nazwa jest za długa'),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const emailTemplateSchema = z.object({
  name: z.string().min(1, 'Nazwa szablonu jest wymagana').max(100, 'Nazwa jest za długa'),
  subject: z.string().min(1, 'Temat jest wymagany').max(200, 'Temat jest za długi'),
  content: z.string().min(1, 'Treść jest wymagana'),
  category: z.enum(['newsletter', 'promotional', 'transactional', 'custom']),
  isActive: z.boolean().default(true),
})

export const campaignSchema = z.object({
  name: z.string().min(1, 'Nazwa kampanii jest wymagana').max(100, 'Nazwa jest za długa'),
  subject: z.string().min(1, 'Temat jest wymagany').max(200, 'Temat jest za długi'),
  content: z.string().min(1, 'Treść jest wymagana'),
  mailingListId: z.string().min(1, 'Lista mailingowa jest wymagana'),
  templateId: z.string().optional(),
  scheduledAt: z.date().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
})

export const userSchema = z.object({
  name: z.string().min(1, 'Nazwa jest wymagana').max(100, 'Nazwa jest za długa'),
  email: z.string().email('Nieprawidłowy adres email'),
  role: z.enum(['admin', 'user']).default('user'),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type MailingListFormData = z.infer<typeof mailingListSchema>
export type EmailTemplateFormData = z.infer<typeof emailTemplateSchema>
export type CampaignFormData = z.infer<typeof campaignSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type UserFormData = z.infer<typeof userSchema> 