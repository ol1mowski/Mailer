export interface UserSettings {
  name: string
  email: string
  company: string
  timezone: string
  language: string
}

export interface NotificationSettings {
  emailNotifications: boolean
  campaignAlerts: boolean
  weeklyReports: boolean
  errorAlerts: boolean
}

export interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordExpiry: number
}

export interface EmailSettings {
  defaultSender: string
  senderName: string
  sendLimit: number
  autoTracking: boolean
  spamCheck: boolean
}

export interface AccountStatus {
  plan: string
  activeUntil: string
  status: 'active' | 'inactive' | 'suspended'
}

export interface SettingsData {
  user: UserSettings
  notifications: NotificationSettings
  security: SecuritySettings
  email: EmailSettings
  account: AccountStatus
} 