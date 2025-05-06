import React, { useEffect } from 'react'
import Navbar from "./components/Navbar.tsx"
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import { axiosInstance } from './lib/axios.ts'
import { useAuthStore } from './store/useAuthStore.ts'
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'

export const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser})
  
  if (isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser? <HomePage/>:<Navigate to="/login" />}/>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/" /> }/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/" />}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login" />}/>
      </Routes>
      <Toaster/>
    </div>
  )
}
export default App