import type { UserSettings, UpdateUserSettingsRequest } from '@/lib/api'

export type { UserSettings, UpdateUserSettingsRequest }

export interface SettingsFormData {
  user: {
    firstName: string;
    lastName: string;
    timezone: string;
  };
  email: {
    resendApiKey: string;
    fromEmail: string;
    fromName: string;
    replyToEmail: string;
    customDomain: string;
  };
  account: {
    status: string;
    plan: string;
    expires: string;
  };
}

export interface SettingsFormErrors {
  user: {
    firstName?: string;
    lastName?: string;
    timezone?: string;
  };
  email: {
    resendApiKey?: string;
    fromEmail?: string;
    fromName?: string;
    replyToEmail?: string;
    customDomain?: string;
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

// Opcje dla Resend - obecnie nie potrzebujemy szyfrowania SMTP
export const RESEND_HELP_TEXT = {
  apiKey: 'Klucz API Resend można uzyskać na stronie resend.com w sekcji API Keys',
  customDomain: 'Opcjonalna domena niestandardowa skonfigurowana w Resend',
  fromEmail: 'Adres email nadawcy (musi być zweryfikowany w Resend)',
}; 