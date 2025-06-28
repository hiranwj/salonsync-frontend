import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/homepage/HomePage.tsx'
import SignupForm from './pages/sign-up/SignUpForm.tsx'
import LoginForm from './pages/log-in/LogInForm.tsx';
import './App.css'
import AdminDashboard from './pages/admin-dashboard/AdminDashboard.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
