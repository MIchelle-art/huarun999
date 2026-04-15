import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  List, 
  Grid, 
  ChevronDown, 
  Folder as FolderIcon,
  Image as ImageIcon,
  FileText,
  FileArchive,
  File,
  MoreHorizontal,
  ShieldCheck,
  User,
  Settings,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CheckCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'image' | 'ppt' | 'txt' | 'word' | 'pdf';
  size: string;
  uploader: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  status: string;
}

const mockDocuments: Document[] = [
  { id: '1', name: '活动现场_02.jpg', type: 'image', size: '3.5MB', uploader: '市场部', createdAt: '2024-03-05\n09:05', updatedAt: '2024-03-05\n09:05', enabled: true, status: '预览' },
  { id: '2', name: '活动现场_01.jpg', type: 'image', size: '3.2MB', uploader: '市场部', createdAt: '2024-03-05\n09:00', updatedAt: '2024-03-05\n09:00', enabled: true, status: '预览' },
  { id: '3', name: '2024Q1_Review.pptx', type: 'ppt', size: '8.4MB', uploader: 'oujiemin', createdAt: '2024-03-01\n15:30', updatedAt: '2024-03-01\n15:30', enabled: false, status: '预览' },
  { id: '4', name: '错误日志_20240228.txt', type: 'txt', size: '2MB', uploader: '系统', createdAt: '2024-02-28\n23:59', updatedAt: '2024-02-28\n23:59', enabled: true, status: '预览' },
  { id: '5', name: '产品培训视频脚本.docx', type: 'word', size: '120KB', uploader: '培训组', createdAt: '2024-02-20\n14:00', updatedAt: '2024-02-20\n14:00', enabled: true, status: '预览' },
  { id: '6', name: '前端开发规范.pdf', type: 'pdf', size: '1.5MB', uploader: 'tianyang', createdAt: '2024-02-15\n13:00', updatedAt: '2024-02-15\n13:00', enabled: true, status: '预览' },
  { id: '7', name: '部署脚本.txt', type: 'txt', size: '12KB', uploader: 'DevOps', createdAt: '2024-02-12\n10:20', updatedAt: '2024-02-12\n10:20', enabled: true, status: '预览' },
  { id: '8', name: 'API接口文档.docx', type: 'word', size: '0.8MB', uploader: '王五', createdAt: '2024-02-11\n09:15', updatedAt: '2024-02-11\n09:15', enabled: true, status: '预览' },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'image': return <ImageIcon className="text-purple-500 w-5 h-5" />;
    case 'ppt': return <FileArchive className="text-orange-500 w-5 h-5" />;
    case 'word': return <FileText className="text-blue-500 w-5 h-5" />;
    case 'pdf': return <FileText className="text-red-500 w-5 h-5" />;
    case 'txt': return <File className="text-gray-500 w-5 h-5" />;
    default: return <File className="text-gray-500 w-5 h-5" />;
  }
};

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={cn(
      "w-10 h-5 rounded-full flex items-center px-0.5 transition-colors relative",
      checked ? "bg-[#FF6B35]" : "bg-gray-200"
    )}
  >
    <div 
      className={cn(
        "w-4 h-4 bg-white rounded-full shadow-sm transition-transform transform",
        checked ? "translate-x-5" : "translate-x-0"
      )} 
    />
  </button>
);

export function MainContent() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(mockDocuments);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [folders, setFolders] = useState([
    { id: 'f1', name: '产品推广素材', count: 9, approver: '王总监' },
    { id: 'f2', name: '技术研发文档', count: 6, approver: '李技术' },
    { id: 'f3', name: '财务报表(绝密)', count: 0, approver: '赵财务' },
  ]);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [approverModalOpen, setApproverModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<{id: string, name: string, approver: string} | null>(null);
  const [tempApprover, setTempApprover] = useState<string>('');
  const [showApproverDropdown, setShowApproverDropdown] = useState(false);

  const mockUsers = ['王总监', '李技术', '赵财务', '张经理', '刘审核'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDocument = (id: string) => {
    setDocuments(docs => docs.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d));
  };

  const handleDropdownToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const openSyncModal = (doc: Document) => {
    setSelectedDoc(doc);
    // Find the folder approver based on doc folder (mocking this logic by assigning default '产品推广素材' folder approver)
    const folderApprover = folders[0].approver;
    setTempApprover(folderApprover);
    setSyncModalOpen(true);
    setActiveDropdown(null);
  };

  const submitApproval = () => {
    // Mock the submission process
    setSyncModalOpen(false);
    alert(`《${selectedDoc?.name}》脱敏及审批流程已触发！已提交给 ${tempApprover} 审批。`);
    navigate('/approval');
  };

  const openApproverModal = (folder: {id: string, name: string, approver: string}) => {
    setSelectedFolder(folder);
    setApproverModalOpen(true);
  };

  const saveApprover = () => {
    if (selectedFolder) {
      setFolders(folders.map(f => f.id === selectedFolder.id ? { ...f, approver: selectedFolder.approver } : f));
      setApproverModalOpen(false);
    }
  };

  return (
    <div className="flex-1 bg-[#FAFAFA] h-screen overflow-y-auto px-8 py-6 flex flex-col">
      {/* Top Header & Toolbar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-sm text-gray-400 mb-1">所有文档</div>
          <h1 className="text-2xl font-bold text-gray-800">搜索结果</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
            <button className="p-1.5 text-[#FF6B35] bg-orange-50 rounded-md">
              <List size={18} />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600">
              <Grid size={18} />
            </button>
          </div>

          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <span className="text-[#FF6B35]">↓</span> 综合排序 <ChevronDown size={16} className="text-gray-400" />
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索授权范围内的文件名..."
              className="w-[280px] pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Folder Cards */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
          <FolderIcon size={16} />
          <span>文件夹 (3)</span>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all group relative">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                <FolderIcon size={24} fill="currentColor" className="text-[#FF6B35]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-base mb-1 truncate cursor-pointer hover:text-[#FF6B35] transition-colors">{folder.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">{folder.count} 个文件</p>
                  
                  {/* <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100 group/approver cursor-pointer transition-colors hover:bg-orange-50 hover:border-orange-100"
                    onClick={() => openApproverModal(folder)}
                    title="点击设置审批人"
                  >
                    <User size={12} className="text-gray-400 group-hover/approver:text-[#FF6B35]" />
                    <span className="text-[11px] text-gray-500 group-hover/approver:text-orange-700 font-medium">
                      审批人: {folder.approver}
                    </span>
                    <Settings size={10} className="text-gray-300 ml-0.5 opacity-0 group-hover:opacity-100 group-hover/approver:text-[#FF6B35] transition-opacity" />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 p-4 text-gray-500 text-sm border-b border-gray-100 bg-gray-50/50">
          <FileText size={16} />
          <span>文档列表 (18)</span>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400 font-medium">
                <th className="py-4 pl-6 pr-4 w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="py-4 px-4 font-medium w-[280px]">文档名称</th>
                <th className="py-4 px-4 font-medium w-24">大小</th>
                <th className="py-4 px-4 font-medium w-28">上传者</th>
                <th className="py-4 px-4 font-medium w-36">创建时间</th>
                <th className="py-4 px-4 font-medium w-36">更新时间</th>
                <th className="py-4 px-4 font-medium w-28">启用/禁用</th>
                <th className="py-4 px-4 font-medium w-20">状态</th>
                <th className="py-4 pr-6 pl-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {documents.map((doc, index) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 pl-6 pr-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <span className="font-semibold text-gray-800">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-500">{doc.size}</td>
                  <td className="py-4 px-4 text-gray-500">{doc.uploader}</td>
                  <td className="py-4 px-4 text-gray-400 text-xs whitespace-pre-wrap">{doc.createdAt}</td>
                  <td className="py-4 px-4 text-gray-400 text-xs whitespace-pre-wrap">{doc.updatedAt}</td>
                  <td className="py-4 px-4">
                    <Switch checked={doc.enabled} onChange={() => toggleDocument(doc.id)} />
                  </td>
                  <td className="py-4 px-4 text-gray-400">{doc.status}</td>
                  <td className="py-4 pr-6 pl-4">
                    <div className="flex items-center justify-end gap-3 text-[#1890FF] font-medium text-[13px]">
                      <button className="hover:text-blue-600 transition-colors">下载</button>
                      <button className="hover:text-blue-600 transition-colors">重试</button>
                      <div className="relative" ref={activeDropdown === doc.id ? dropdownRef : null}>
                        <button 
                          className={cn(
                            "text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors",
                            activeDropdown === doc.id && "bg-gray-100 text-gray-800"
                          )}
                          onClick={(e) => handleDropdownToggle(doc.id, e)}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        
                        {activeDropdown === doc.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50 text-gray-700">
                            <button className="w-full text-left px-4 py-2.5 text-[13px] font-normal hover:bg-orange-50 hover:text-[#FF6B35] transition-colors">
                              移动
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-[13px] font-normal hover:bg-orange-50 hover:text-[#FF6B35] transition-colors">
                              删除
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-[13px] font-normal hover:bg-orange-50 hover:text-[#FF6B35] transition-colors border-t border-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                openSyncModal(doc);
                              }}
                            >
                              脱敏后同步至pitchlab
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approver Modal */}
      {approverModalOpen && selectedFolder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-[400px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">设置文件夹审批人</h3>
              <button onClick={() => setApproverModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">目标文件夹</label>
                <div className="text-gray-500 bg-gray-50 px-3 py-2 rounded-lg text-sm border border-gray-100">{selectedFolder.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">指定审批人</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      value={selectedFolder.approver}
                      onChange={(e) => setSelectedFolder({...selectedFolder, approver: e.target.value})}
                      onFocus={() => setShowApproverDropdown(true)}
                      onBlur={() => setTimeout(() => setShowApproverDropdown(false), 200)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="输入或选择审批人姓名..."
                    />
                    {showApproverDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                        {mockUsers.filter(u => u.includes(selectedFolder.approver)).map((user, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B35] cursor-pointer transition-colors"
                            onClick={() => {
                              setSelectedFolder({...selectedFolder, approver: user});
                              setShowApproverDropdown(false);
                            }}
                          >
                            {user}
                          </div>
                        ))}
                        {mockUsers.filter(u => u.includes(selectedFolder.approver)).length === 0 && (
                          <div className="px-4 py-2 text-sm text-gray-400 text-center">无匹配用户</div>
                        )}
                      </div>
                    )}
                  </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setApproverModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={saveApprover}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#FF6B35] text-white hover:bg-[#e55a2b] transition-colors shadow-sm"
              >
                保存设置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sync Modal */}
      {syncModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-[480px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <ShieldCheck className="text-[#FF6B35]" size={20} /> 脱敏及审批流程
              </h3>
              <button onClick={() => setSyncModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 text-gray-600 text-sm leading-relaxed">
              <p className="mb-4">
                即将对文档 <span className="font-bold text-gray-800">《{selectedDoc.name}》</span> 触发大模型脱敏重写。
              </p>
              <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-4 mb-4">
                <p className="mb-2 text-gray-700">请确认或重新指定审批人：</p>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      value={tempApprover}
                      onChange={(e) => setTempApprover(e.target.value)}
                      onFocus={() => setShowApproverDropdown(true)}
                      onBlur={() => setTimeout(() => setShowApproverDropdown(false), 200)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="输入或选择审批人姓名..."
                    />
                    {showApproverDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                        {mockUsers.filter(u => u.includes(tempApprover)).map((user, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B35] cursor-pointer transition-colors"
                            onClick={() => {
                              setTempApprover(user);
                              setShowApproverDropdown(false);
                            }}
                          >
                            {user}
                          </div>
                        ))}
                        {mockUsers.filter(u => u.includes(tempApprover)).length === 0 && (
                          <div className="px-4 py-2 text-sm text-gray-400 text-center">无匹配用户</div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs shrink-0 whitespace-nowrap">(默认取自该文档所属文件夹)</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">注：审核通过后将自动执行至 pitchlab 系统的同步推送操作。</p>
            </div>
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setSyncModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={submitApproval}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#FF6B35] text-white hover:bg-[#e55a2b] transition-colors shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle size={16} /> 确认提交审批
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}