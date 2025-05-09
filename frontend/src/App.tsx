import Navbar from "./components/Navbar.tsx"
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import { useAuthStore } from './store/useAuthStore.ts'
import { Toaster } from 'react-hot-toast'
import { useEffect } from "react"
import { ProtectedRoute, UnauthenticatedRoute } from './components/ProtectedRoute';
import './index.css'
import { useThemeStore } from "./store/useThemeStore.ts"

export const App = () => {
  const { checkAuth } = useAuthStore()
  const {theme}=useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        {/* Protected Routes */}
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }/>
        
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }/>

        <Route path="/settings" element={<SettingsPage />} />

        {/* Unauthenticated Routes */}
        <Route path='/login' element={
          <UnauthenticatedRoute>
            <LoginPage/>
          </UnauthenticatedRoute>
        }/>

        <Route path='/signup' element={
          <UnauthenticatedRoute>  
            <SignUpPage/>
          </UnauthenticatedRoute>
        }/>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App