import { LoginCard } from './LoginCard'

interface LoginPageProps {
  onSuccess?: () => void
}

export const LoginPage = ({ onSuccess }: LoginPageProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.05) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <LoginCard onSuccess={onSuccess} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
    </div>
  )
} 