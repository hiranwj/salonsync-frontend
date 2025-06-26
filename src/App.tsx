import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/homepage/HomePage.tsx'
import SignupForm from './pages/sign-up/SignUpForm.tsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path='/' element={<HomePage />} />*/}
        <Route path='/' element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
