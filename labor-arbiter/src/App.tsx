import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import HomePage from './sections/HomePage';
import AdminLayout from './sections/AdminLayout';
import Dashboard from './sections/Dashboard';
import LawyerReview from './sections/LawyerReview';
import RuleManager from './sections/RuleManager';
import CaseLibrary from './sections/CaseLibrary';
import AgentControl from './sections/AgentControl';
import EvolutionWheel from './sections/EvolutionWheel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reviews" element={<LawyerReview />} />
          <Route path="rules" element={<RuleManager />} />
          <Route path="cases" element={<CaseLibrary />} />
          <Route path="agents" element={<AgentControl />} />
          <Route path="evolution" element={<EvolutionWheel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
