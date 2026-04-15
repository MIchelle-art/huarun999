import React, { useState } from 'react';
import { LayoutGrid, Plus, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

interface TreeNode {
  id: string;
  name: string;
  isExpanded?: boolean;
  isActive?: boolean;
  children?: TreeNode[];
}

const initialTree: TreeNode[] = [
  {
    id: '1',
    name: '产品推广素材(L1)',
    isExpanded: true,
    children: [
      { id: '1-1', name: '2024Q1规划(L2)', isActive: true }
    ]
  },
  {
    id: '2',
    name: '技术研发文档(L1)'
  },
  {
    id: '3',
    name: '财务报表(绝密)'
  }
];

export function FolderTree() {
  const [tree, setTree] = useState<TreeNode[]>(initialTree);

  const toggleExpand = (id: string) => {
    setTree(prev => 
      prev.map(node => 
        node.id === id 
          ? { ...node, isExpanded: !node.isExpanded } 
          : node
      )
    );
  };

  const renderNode = (node: TreeNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="w-full">
        <div 
          className={cn(
            "flex items-center w-full px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors",
            node.isActive && "bg-orange-50/50"
          )}
          style={{ paddingLeft: `${16 + depth * 24}px` }}
          onClick={() => hasChildren && toggleExpand(node.id)}
        >
          <div className="w-5 h-5 flex items-center justify-center mr-1 text-gray-400">
            {hasChildren ? (
              node.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : null}
          </div>
          <div className="mr-2 text-gray-400">
            {node.isExpanded || node.isActive ? (
              <FolderOpen size={18} className={cn(node.isActive && "text-[#FF6B35]")} />
            ) : (
              <Folder size={18} />
            )}
          </div>
          <span className={cn(
            "text-sm font-medium flex-1 truncate",
            node.isActive ? "text-[#FF6B35]" : "text-gray-700"
          )}>
            {node.name}
          </span>
        </div>
        
        {node.isExpanded && hasChildren && (
          <div className="w-full">
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col shrink-0">
      {/* Top Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
          <LayoutGrid size={20} className="text-gray-600 mr-3" />
          <span className="font-bold text-gray-800 text-[15px]">所有文档</span>
        </div>
      </div>

      {/* File Groups */}
      <div className="flex items-center justify-between px-6 py-2 mt-2 group">
        <span className="text-xs text-gray-400 font-medium tracking-wider">文件组</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
          <Plus size={16} />
        </button>
      </div>

      {/* Tree View */}
      <div className="flex-1 overflow-y-auto py-2">
        {tree.map(node => renderNode(node))}
      </div>
    </div>
  );
}