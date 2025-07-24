import { useAuth } from '@/components/auth/hooks/auth.hook'
import { LoginPage } from '@/components/auth/LoginPage.page'
import { Dashboard } from '@/components/dashboard/Dashboard.page'

const App = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Dashboard />
  }

  return <LoginPage />
}

export default App