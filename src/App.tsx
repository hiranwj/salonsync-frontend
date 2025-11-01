import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/homepage/HomePage.tsx'
import SignupForm from './pages/sign-up/SignUpForm.tsx'
import LoginForm from './pages/log-in/LogInForm.tsx';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard.tsx';
import BookAppointment from './pages/book-appointment/BookAppointment.tsx';
import StylistForm from './pages/stylist-management/stylist-management.tsx';
import AppointmentManagement from './pages/appointment-management/appointment-management.tsx';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path="/book-an-apointment" element={<BookAppointment />} />
        <Route path="/stylist-management" element={<StylistForm />} />
        <Route path="/appointment-management" element={<AppointmentManagement />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
