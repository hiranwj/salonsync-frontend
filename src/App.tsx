import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/homepage/HomePage.tsx'
import SignupForm from './pages/sign-up/SignUpForm.tsx'
import LoginForm from './pages/log-in/LogInForm.tsx';
import './App.css'
import AdminDashboard from './pages/admin-dashboard/AdminDashboard.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
