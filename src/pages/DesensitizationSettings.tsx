import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { DesensitizationContent } from '../components/DesensitizationContent';

export function DesensitizationSettings() {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar />
      <DesensitizationContent />
    </div>
  );
}