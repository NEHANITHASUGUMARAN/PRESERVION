// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguagePopup from './components/LanguagePopup';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FarmerDashboard from './pages/FarmerDashboard';
import TraderDashboard from './pages/TraderDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import Dashboard from './pages/Dashboard'; 


export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LanguagePopup />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/trader-dashboard" element={<TraderDashboard />} />
          <Route path="/government-dashboard" element={<GovernmentDashboard />} />
          <Route path="/container/:id" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}