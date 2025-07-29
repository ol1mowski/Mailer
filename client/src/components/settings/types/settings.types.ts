import type { UserSettings, UpdateUserSettingsRequest } from '@/lib/api'

export type { UserSettings, UpdateUserSettingsRequest }

export interface SettingsFormData {
  user: {
    firstName: string;
    lastName: string;
    timezone: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    campaignNotifications: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
  };
  security: {
    loginNotifications: boolean;
    passwordChangeReminder: boolean;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    smtpEncryption: string;
    fromEmail: string;
    fromName: string;
    replyToEmail: string;
  };
  account: {
    status: string;
    plan: string;
    expires: string;
    storageUsed: number;
    storageLimit: number;
  };
}

export interface SettingsFormErrors {
  user: {
    firstName?: string;
    lastName?: string;
    timezone?: string;
  };
  email: {
    smtpHost?: string;
    smtpPort?: string;
    smtpUsername?: string;
    smtpPassword?: string;
    fromEmail?: string;
    fromName?: string;
    replyToEmail?: string;
  };
}

export interface TimezoneOption {
  value: string;
  label: string;
}

export const TIMEZONES: TimezoneOption[] = [
  { value: 'Europe/Warsaw', label: 'Europe/Warsaw (UTC+1)' },
  { value: 'Europe/London', label: 'Europe/London (UTC+0)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (UTC+1)' },
  { value: 'America/New_York', label: 'America/New_York (UTC-5)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (UTC-8)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+9)' },
];

export const SMTP_ENCRYPTION_OPTIONS = [
  { value: 'TLS', label: 'TLS' },
  { value: 'SSL', label: 'SSL' },
  { value: 'NONE', label: 'Brak' },
]; 