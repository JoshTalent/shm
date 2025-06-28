import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from './web/pages/dashboard'
import Patient from './web/pages/patient'
import Reports from './web/pages/reports'
import Profile from './web/pages/profile'
import Login from './web/pages/login'
import Register from './web/pages/register'
import CriticalCare from './web/pages/CriticalCare'
import LongTermCare from './web/pages/LongTermCare'
import Devices from './web/pages/Devices'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/patients" element={
          <ProtectedRoute>
            <Patient />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/critical-care" element={
          <ProtectedRoute>
            <CriticalCare />
          </ProtectedRoute>
        } />
        <Route path="/long-term-care" element={
          <ProtectedRoute>
            <LongTermCare />
          </ProtectedRoute>
        } />
        <Route path="/devices" element={
          <ProtectedRoute>
            <Devices />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App