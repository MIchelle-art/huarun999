import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ApprovalContent } from '../components/ApprovalContent';

export function ApprovalManagement() {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar />
      <ApprovalContent />
    </div>
  );
}