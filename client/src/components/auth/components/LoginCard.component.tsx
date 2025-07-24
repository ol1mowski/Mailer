import { Mail, Shield } from 'lucide-react'
import { LoginForm } from './LoginForm.component'

interface LoginCardProps {
  onSuccess?: () => void
}

export const LoginCard = ({ onSuccess }: LoginCardProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Mailer Dashboard
          </h1>
          <p className="text-gray-600">
            Zaloguj się do systemu zarządzania mailami
          </p>
        </div>

        <LoginForm onSuccess={onSuccess} />

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Shield className="h-4 w-4 mr-2" />
            Bezpieczne połączenie SSL
          </div>
        </div>
      </div>
    </div>
  )
} 