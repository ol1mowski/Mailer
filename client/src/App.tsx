import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { queryClient } from './lib/queryClient';
import { LoginPage } from './components/auth/LoginPage.page';
import { Layout } from './components/layout/Layout.component';
import { Dashboard } from './components/dashboard/Dashboard.page';
import { ContactsPage } from './components/contacts/ContactsPage.page';
import { MailingListsPage } from './components/mailingList/MailingListsPage.page';
import { EmailTemplatesPage } from './components/emailTemplates/EmailTemplatesPage.page';
import { CampaignsPage } from './components/campaigns/CampaignsPage.page';
import { AnalyticsPage } from './components/analytics/AnalyticsPage.page';
import { SettingsPage } from './components/settings/SettingsPage.page';
import { useAuth } from './hooks/useAuth.hook';
import { ROUTES } from './constants/app.constants';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppContent />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.CONTACTS} element={<ContactsPage />} />
        <Route path={ROUTES.MAILING_LISTS} element={<MailingListsPage />} />
        <Route path={ROUTES.EMAIL_TEMPLATES} element={<EmailTemplatesPage />} />
        <Route path={ROUTES.CAMPAIGNS} element={<CampaignsPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;