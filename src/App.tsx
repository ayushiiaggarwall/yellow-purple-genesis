import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import UpdatePasswordPage from './pages/UpdatePasswordPage'
import AuthErrorPage from './pages/AuthErrorPage'

// Loading Component
import LoadingSpinner from './components/ui/LoadingSpinner'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/error" element={<AuthErrorPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password/update" element={<UpdatePasswordPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App