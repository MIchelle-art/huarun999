import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { FolderTree } from '../components/FolderTree';
import { MainContent } from '../components/MainContent';

export function DocumentManagement() {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar />
      <FolderTree />
      <MainContent />
    </div>
  );
}