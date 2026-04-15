import React, { useState } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  User, 
  Phone, 
  MapPin, 
  DollarSign, 
  Target, 
  Terminal,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { cn } from '../utils/cn';

interface Rule {
  id: string;
  type: string;
  enabled: boolean;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const defaultRules: Rule[] = [
  { id: '1', type: '客户名称', enabled: true, description: '将真实客户名称替换为虚拟名称或代称（如：客户A）', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: '2', type: '客户电话', enabled: true, description: '将手机号、座机号替换为带星号的格式（如：138********）', icon: Phone, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: '3', type: '地址信息', enabled: true, description: '模糊化具体地址，仅保留省市级别（如：******区）', icon: MapPin, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: '4', type: '金额与合同条款', enabled: true, description: '将具体金额、比例、违约金等核心条款进行隐藏处理', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: '5', type: '商业策略类字段', enabled: true, description: '隐藏核心打法、定价策略、渠道折扣等敏感商业机密', icon: Target, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: '6', type: '内部代号、操作SOP', enabled: true, description: '将内部专有项目代号、系统链接、SOP流程细节模糊化', icon: Terminal, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={cn(
      "w-11 h-6 rounded-full flex items-center px-0.5 transition-colors relative shrink-0",
      checked ? "bg-[#FF6B35]" : "bg-gray-200"
    )}
  >
    <div 
      className={cn(
        "w-5 h-5 bg-white rounded-full shadow-sm transition-transform transform",
        checked ? "translate-x-5" : "translate-x-0"
      )} 
    />
  </button>
);

export function DesensitizationContent() {
  const [rules, setRules] = useState<Rule[]>(defaultRules);
  const [prompt, setPrompt] = useState('请作为专业的数据安全专家，严格按照以下选中的脱敏规则对文档进行重写。保持原文的语义和结构不变，仅对敏感信息进行脱敏处理。');

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="flex-1 bg-[#FAFAFA] h-screen overflow-y-auto relative">
      {/* Header - Sticky */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 px-8 py-5 flex items-center justify-between shadow-sm">
        <div>
          <div className="text-xs text-gray-400 mb-1 tracking-wide uppercase font-medium">系统设置 / 安全配置</div>
          <h1 className="text-2xl font-bold text-gray-800">脱敏规则设置</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
            取消更改
          </button>
          <button className="flex items-center gap-2 bg-[#FF6B35] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e55a2b] transition-all shadow-sm hover:shadow">
            <Save size={18} /> 保存配置
          </button>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-8 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100/60 rounded-2xl p-5 mb-8 flex items-start gap-4 shadow-sm">
          <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
            <Sparkles className="text-[#FF6B35]" size={20} />
          </div>
          <div>
            <h3 className="text-orange-900 font-bold text-base mb-1.5">大模型脱敏重写机制</h3>
            <p className="text-orange-700/90 text-[13px] leading-relaxed">
              开启脱敏同步后，系统将调用大语言模型（LLM）按照下方配置的规则对原文档进行语义级别的重写和信息替换。
              脱敏过程会在确保原文语境和结构完整的前提下，自动生成安全的脱敏版本，然后再进行数据同步或分享操作。
            </p>
          </div>
        </div>

        {/* Global Prompt Setting */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                <Terminal size={16} className="text-gray-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">全局重写提示词 <span className="text-gray-400 font-normal text-sm ml-1">(System Prompt)</span></h2>
            </div>
            <button 
              onClick={() => setPrompt('请作为专业的数据安全专家，严格按照以下选中的脱敏规则对文档进行重写。保持原文的语义和结构不变，仅对敏感信息进行脱敏处理。')}
              className="text-sm text-gray-400 hover:text-[#FF6B35] flex items-center gap-1.5 transition-colors font-medium"
            >
              <RefreshCw size={14} /> 恢复默认
            </button>
          </div>
          <div className="relative group">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-28 p-4 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] leading-relaxed text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none transition-all font-mono"
              placeholder="输入大模型脱敏系统提示词..."
            />
          </div>
        </div>

        {/* Rules List */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">脱敏规则配置</h2>
            <p className="text-sm text-gray-500">勾选需要在重写时应用的信息抹除或泛化规则</p>
          </div>
          <button className="flex items-center gap-2 text-[#FF6B35] bg-orange-50 px-4 py-2 rounded-xl text-sm hover:bg-orange-100 transition-colors font-semibold">
            <Plus size={16} strokeWidth={2.5} /> 新增自定义规则
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-12">
          {rules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div 
                key={rule.id} 
                className={cn(
                  "bg-white rounded-2xl p-5 border transition-all duration-200 relative group",
                  rule.enabled 
                    ? "border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200" 
                    : "border-gray-100 bg-gray-50/50"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    rule.enabled ? rule.bg : "bg-gray-100"
                  )}>
                    <Icon size={20} className={rule.enabled ? rule.color : "text-gray-400"} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className={cn(
                        "text-base font-bold truncate pr-4 transition-colors", 
                        rule.enabled ? "text-gray-800" : "text-gray-400"
                      )}>
                        {rule.type}
                      </h4>
                      <Switch checked={rule.enabled} onChange={() => toggleRule(rule.id)} />
                    </div>
                    <p className={cn(
                      "text-[13px] leading-relaxed transition-colors line-clamp-2 pr-6",
                      rule.enabled ? "text-gray-500" : "text-gray-400"
                    )}>
                      {rule.description}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => deleteRule(rule.id)}
                  className="absolute top-4 right-16 p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                  title="删除规则"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}