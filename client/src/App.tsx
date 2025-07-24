import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/components/auth/hooks/auth.hook'
import { LoginPage } from '@/components/auth/LoginPage.page'
import { Layout } from '@/components/layout/Layout.component'
import { Dashboard } from '@/components/dashboard'
import { MailingListsPage } from '@/components/mailingList/MailingListsPage.page'
import { ContactsPage } from '@/components/contacts'
import { EmailTemplatesPage } from '@/components/emailTemplates'
import { CampaignsPage } from '@/components/campaigns'
import { AnalyticsPage } from '@/components/analytics'
import { SettingsPage } from '@/components/settings/SettingsPage.page'
import { ErrorBoundary, Loading } from '@/components/ui'
import { ROUTES } from '@/constants/app.constants'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <Loading fullScreen text="Weryfikacja autoryzacji..." />
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

const App = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loading fullScreen text="Inicjalizacja aplikacji..." />
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />} 
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MAILING_LISTS}
          element={
            <ProtectedRoute>
              <Layout>
                <MailingListsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CONTACTS}
          element={
            <ProtectedRoute>
              <Layout>
                <ContactsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.EMAIL_TEMPLATES}
          element={
            <ProtectedRoute>
              <Layout>
                <EmailTemplatesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CAMPAIGNS}
          element={
            <ProtectedRoute>
              <Layout>
                <CampaignsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <ProtectedRoute>
              <Layout>
                <AnalyticsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/" 
          element={<Navigate to={ROUTES.DASHBOARD} replace />} 
        />
        <Route 
          path="*" 
          element={<Navigate to={ROUTES.DASHBOARD} replace />} 
        />
      </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App