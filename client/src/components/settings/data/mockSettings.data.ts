import type { SettingsData } from '../types/settings.types'

export const mockSettingsData: SettingsData = {
  user: {
    name: 'Admin User',
    email: 'admin@mailer.com',
    company: 'Mailer Company',
    timezone: 'Europe/Warsaw',
    language: 'pl',
  },
  notifications: {
    emailNotifications: true,
    campaignAlerts: true,
    weeklyReports: false,
    errorAlerts: true,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
  },
  email: {
    defaultSender: 'noreply@mailer.com',
    senderName: 'Mailer System',
    sendLimit: 1000,
    autoTracking: true,
    spamCheck: true,
  },
  account: {
    plan: 'Professional',
    activeUntil: '31.12.2024',
    status: 'active',
  }
}

export const timezones = [
  { value: 'Europe/Warsaw', label: 'Warszawa (UTC+1)' },
  { value: 'Europe/London', label: 'Londyn (UTC+0)' },
  { value: 'America/New_York', label: 'Nowy Jork (UTC-5)' },
  { value: 'Asia/Tokyo', label: 'Tokio (UTC+9)' },
]

export const languages = [
  { value: 'pl', label: 'Polski' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Français' },
] 