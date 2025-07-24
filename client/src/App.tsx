import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/components/auth/LoginPage'
import { Dashboard } from '@/components/dashboard/Dashboard'

const App = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Dashboard />
  }

  return <LoginPage />
}

export default App