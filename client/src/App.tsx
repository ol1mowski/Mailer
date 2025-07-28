import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";
import { useAuth } from "./hooks/useAuth.hook";
import { LoginPage } from "./components/auth/LoginPage.page";
import { Dashboard } from "./components/dashboard/Dashboard.page";
import { ContactsPage } from "./components/contacts/ContactsPage.page";
import { EmailTemplatesPage } from "./components/emailTemplates/EmailTemplatesPage.page";
import { CampaignsPage } from "./components/campaigns/CampaignsPage.page";
import { AnalyticsPage } from "./components/analytics/AnalyticsPage.page";
import { SettingsPage } from "./components/settings/SettingsPage.page";
import { Layout } from "./components/layout/Layout.component";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ROUTES } from "./constants/app.constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
                  background: "#363636",
                  color: "#fff",
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

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.DASHBOARD} replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.DASHBOARD} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path={ROUTES.CONTACTS}
          element={
            <Layout>
              <ContactsPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.EMAIL_TEMPLATES}
          element={
            <Layout>
              <EmailTemplatesPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.CAMPAIGNS}
          element={
            <Layout>
              <CampaignsPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <Layout>
              <AnalyticsPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
