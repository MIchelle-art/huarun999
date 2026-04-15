import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentManagement } from './pages/DocumentManagement';
import { DesensitizationSettings } from './pages/DesensitizationSettings';
import { ApprovalManagement } from './pages/ApprovalManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocumentManagement />} />
        <Route path="/desensitization" element={<DesensitizationSettings />} />
        <Route path="/approval" element={<ApprovalManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;