import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  FolderOpen, 
  BarChart2, 
  PieChart, 
  Video, 
  ClipboardList, 
  Users, 
  CheckSquare, 
  Database, 
  Megaphone,
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { icon: BookOpen, label: '知识问答', path: '/qa' },
  { icon: FolderOpen, label: '知识管理', path: '/' },
  { icon: BarChart2, label: 'ChatBI', path: '/chatbi' },
  { icon: PieChart, label: '报表管理', path: '/reports' },
  { icon: Video, label: '视频分析', path: '/video' },
  { icon: ClipboardList, label: '问答记录', path: '/history' },
  { icon: Users, label: '用户管理', path: '/users' },
  { icon: CheckSquare, label: '审批管理', path: '/approval' },
  { icon: Database, label: '数据库表管理', path: '/db' },
  { icon: Megaphone, label: '系统公告', path: '/announcement' },
  { icon: Shield, label: '规则中心', path: '/desensitization' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-[88px] h-screen bg-white border-r border-gray-100 flex flex-col items-center py-6 shrink-0 z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)]">
      {/* Logo */}
      <div className="mb-8 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-[#FF6B35] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
          M
        </div>
      </div>
      
      {/* User Avatar Placeholder */}
      <div className="mb-8">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-[#FF6B35] font-semibold text-sm">
          a
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col items-center w-full gap-2 overflow-y-auto no-scrollbar pb-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
          
          return (
            <div 
              key={index} 
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-[72px] rounded-2xl cursor-pointer transition-all",
                isActive 
                  ? "bg-[#FF6B35] shadow-md shadow-orange-200" 
                  : "hover:bg-gray-50 text-gray-500"
              )}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("mb-1.5", isActive ? "text-white" : "text-gray-400")} 
              />
              <span 
                className={cn(
                  "text-[11px] font-medium scale-90 text-center leading-tight", 
                  isActive ? "text-white" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}