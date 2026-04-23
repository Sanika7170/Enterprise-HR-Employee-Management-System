import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LeaveManagement from './pages/LeaveManagement';
import Departments from './pages/Departments';
import Employees from './pages/Employees';
import './styles/main.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/leaves" element={<LeaveManagement />} />
      </Routes>
    </Router>
  );
}
