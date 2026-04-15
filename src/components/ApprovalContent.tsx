import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  FileText,
  Filter,
  X,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ApprovalRecord {
  id: string;
  docName: string;
  folderName: string;
  applicant: string;
  approver: string;
  requestTime: string;
  status: 'pending' | 'approved' | 'rejected';
  summary: string;
}

const mockApprovals: ApprovalRecord[] = [
  { id: '1', docName: '2024Q1_Review_脱敏版.pptx', folderName: '产品推广素材', applicant: '市场部_张三', approver: '王总监', requestTime: '2024-04-14 09:30', status: 'pending', summary: '本文档全面回顾了2024年第一季度的核心业务表现。主要内容包括：1.各产品线的营收达成率及同比增长趋势；2.重点渠道的市场份额变化及ROI分析；3.季度内两次大型营销活动的复盘与转化率拆解；4.针对第二季度设定的业绩目标与初步执行策略框架。' },
  { id: '2', docName: '活动现场_02_脱敏版.jpg', folderName: '产品推广素材', applicant: '市场部_李四', approver: '王总监', requestTime: '2024-04-14 08:15', status: 'approved', summary: '该图片展示了3月份春季新品发布会的线下主会场全景。画面中包含：主舞台的灯光与LED屏幕布置、观众席的整体上座情况、产品体验区的人流交互状态，以及背景处的品牌主视觉海报。' },
  { id: '3', docName: 'API接口文档_脱敏版.docx', folderName: '技术研发文档', applicant: '研发部_王五', approver: '李技术', requestTime: '2024-04-13 16:45', status: 'rejected', summary: '本技术文档详述了移动端App与后端微服务交互的RESTful API规范。文档分为三个主要部分：用户鉴权模块（登录、注册、Token刷新）、商品查询模块（分类列表、详情获取、库存状态）以及订单交易模块（创建订单、支付回调、状态查询）的请求参数与响应格式。' },
  { id: '4', docName: '错误日志_20240228_脱敏版.txt', folderName: '技术研发文档', applicant: '系统', approver: '李技术', requestTime: '2024-04-13 11:20', status: 'approved', summary: '这份日志文件记录了2月28日生产环境中出现的异常堆栈信息。主要涵盖：数据库连接池超时（Timeout Exception）导致的慢查询日志、支付网关回调接口因网络抖动产生的HTTP 502错误记录，以及少部分用户在登录态失效时触发的认证拦截警告。' },
  { id: '5', docName: '前端开发规范_脱敏版.pdf', folderName: '技术研发文档', applicant: 'tianyang', approver: '李技术', requestTime: '2024-04-12 14:00', status: 'approved', summary: '该规范为前端团队的统一开发指南。文档详细规定了：1.基于React/Vue的组件拆分与状态管理最佳实践；2.CSS-in-JS及Tailwind的类名组织原则；3.Git Commit Message的标准格式；4.代码审查（Code Review）的前置检查清单及Eslint配置要求。' },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200/50"><Clock size={12} /> 待审批</span>;
    case 'approved':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/50"><CheckCircle size={12} /> 已通过</span>;
    case 'rejected':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-600 border border-rose-200/50"><XCircle size={12} /> 已驳回</span>;
    default:
      return null;
  }
};

export function ApprovalContent() {
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const [records, setRecords] = useState(mockApprovals);
  const [selectedRecord, setSelectedRecord] = useState<ApprovalRecord | null>(null);

  const handleApprove = (id: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    if (selectedRecord?.id === id) {
      setSelectedRecord({ ...selectedRecord, status: 'approved' });
    }
  };

  const handleReject = (id: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    if (selectedRecord?.id === id) {
      setSelectedRecord({ ...selectedRecord, status: 'rejected' });
    }
  };

  const filteredRecords = activeTab === 'pending' ? records.filter(r => r.status === 'pending') : records;

  return (
    <div className="flex-1 bg-[#FAFAFA] h-screen overflow-y-auto px-8 py-6 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-sm text-gray-400 mb-1">审批管理</div>
          <h1 className="text-2xl font-bold text-gray-800">脱敏同步审批</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs & Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('pending')}
              className={cn(
                "text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors",
                activeTab === 'pending' ? "border-[#FF6B35] text-[#FF6B35]" : "border-transparent text-gray-500 hover:text-gray-800"
              )}
            >
              待我审批
              <span className="ml-2 bg-orange-100 text-[#FF6B35] py-0.5 px-2 rounded-full text-xs">
                {records.filter(r => r.status === 'pending').length}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('all')}
              className={cn(
                "text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors",
                activeTab === 'all' ? "border-[#FF6B35] text-[#FF6B35]" : "border-transparent text-gray-500 hover:text-gray-800"
              )}
            >
              全部记录
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg text-sm transition-colors border border-gray-200">
              <Filter size={16} /> 筛选
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="搜索文档名称或申请人..."
                className="w-64 pl-9 pr-4 py-1.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400 font-medium bg-gray-50/50">
                <th className="py-4 px-6 font-medium w-[240px] align-middle text-center">申请文档 (脱敏后)</th>
                <th className="py-4 px-4 font-medium w-[300px] align-middle text-center">脱敏后文件内容概述</th>
                <th className="py-4 px-4 font-medium align-middle text-center">所属文件夹</th>
                <th className="py-4 px-4 font-medium align-middle text-center">申请人</th>
                <th className="py-4 px-4 font-medium align-middle text-center">审批人</th>
                <th className="py-4 px-4 font-medium align-middle text-center">申请时间</th>
                <th className="py-4 px-4 font-medium align-middle text-center">状态</th>
                <th className="py-4 px-6 font-medium align-middle text-center">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
                {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center text-[#FF6B35] shrink-0">
                          <FileText size={16} />
                        </div>
                        <span className="font-semibold text-gray-800 break-words text-left max-w-[160px]">{record.docName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-middle">
                      <div 
                        className="flex items-start gap-2 bg-amber-50/50 border border-amber-100/50 p-2.5 rounded-lg group/summary cursor-pointer transition-colors hover:bg-amber-50 hover:border-amber-200 text-left mx-auto max-w-[280px]"
                        onClick={() => setSelectedRecord(record)}
                        title="点击查看概述详情并审批"
                      >
                        <Sparkles size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 transition-all">
                          {record.summary}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 align-middle text-center">{record.folderName}</td>
                    <td className="py-4 px-4 text-gray-600 align-middle text-center">{record.applicant}</td>
                    <td className="py-4 px-4 text-gray-600 align-middle text-center">{record.approver}</td>
                    <td className="py-4 px-4 text-gray-400 text-xs align-middle text-center">{record.requestTime}</td>
                    <td className="py-4 px-4 align-middle text-center">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center justify-center gap-3 font-medium text-[13px]">
                      {record.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(record.id)}
                            className="text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            通过
                          </button>
                          <button 
                            onClick={() => handleReject(record.id)}
                            className="text-rose-600 hover:text-rose-700 transition-colors"
                          >
                            驳回
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">
                    暂无审批记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-[600px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                脱敏后文件内容概述
              </h3>
              <button onClick={() => setSelectedRecord(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500 mb-1 block">申请文档</span>
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  <FileText size={16} className="text-[#FF6B35]" />
                  {selectedRecord.docName}
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500 mb-2 block">AI 脱敏摘要</span>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed shadow-sm">
                  {selectedRecord.summary}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-sm">
                <div>
                  <span className="text-gray-400">申请人：</span>
                  <span className="text-gray-700 ml-1">{selectedRecord.applicant}</span>
                </div>
                <div>
                  <span className="text-gray-400">申请时间：</span>
                  <span className="text-gray-700 ml-1">{selectedRecord.requestTime}</span>
                </div>
                <div>
                  <span className="text-gray-400">当前状态：</span>
                  <span className="ml-1"><StatusBadge status={selectedRecord.status} /></span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
              {selectedRecord.status === 'pending' ? (
                <>
                  <button 
                    onClick={() => handleReject(selectedRecord.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100 flex items-center gap-1.5"
                  >
                    <XCircle size={16} /> 驳回申请
                  </button>
                  <button 
                    onClick={() => handleApprove(selectedRecord.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle size={16} /> 审核通过
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="px-6 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  关闭
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}