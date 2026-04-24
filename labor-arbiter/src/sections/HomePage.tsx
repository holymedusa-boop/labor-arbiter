import React, { useState, useEffect } from 'react';
import DisclaimerBanner from './DisclaimerBanner';
import DiagnosisSection from './DiagnosisSection';
import EvidenceSection from './EvidenceSection';
import CalculatorSection from './CalculatorSection';
import ProcessSection from './ProcessSection';
import TemplatesSection from './TemplatesSection';
import AssessmentSection from './AssessmentSection';
import { DisputeType } from '../data/laborLawData';

export default function HomePage() {
  const [selectedTypes, setSelectedTypes] = useState<DisputeType[]>([]);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'assessment' | 'evidence' | 'calculator' | 'process' | 'templates'>('diagnosis');

  useEffect(() => {
    const saved = localStorage.getItem('selectedTypes');
    if (saved) {
      try { setSelectedTypes(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedTypes', JSON.stringify(selectedTypes));
  }, [selectedTypes]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DisclaimerBanner />

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">劳</div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm">劳动仲裁智能助手</h1>
              <p className="text-xs text-gray-500">证据采集 · 赔偿金计算 · 流程指引</p>
            </div>
          </div>
          <a href="/admin" className="text-xs text-blue-600 hover:underline">管理后台</a>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">劳动者的维权行动指南</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-sm">
            不同于通用AI的法律问答，我们提供<span className="font-bold text-white">可执行的解决方案</span>：
            纠纷诊断 → 个性化证据清单 → 赔偿金计算 → 流程指引 → 文书模板
          </p>
          <div className="flex gap-4 justify-center text-xs text-blue-200">
            <span>✓ 10城市最新数据</span>
            <span>✓ 2008前后分段计算</span>
            <span>✓ 复合纠纷支持</span>
            <span>✓ 律师内容审核</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'diagnosis' as const, label: '① 纠纷诊断', desc: '选择纠纷类型' },
              { id: 'assessment' as const, label: '② AI 案情分析', desc: '智能分析' },
              { id: 'evidence' as const, label: '③ 证据清单', desc: selectedTypes.length > 0 ? `${selectedTypes.length}种已选` : '需先完成诊断' },
              { id: 'calculator' as const, label: '④ 赔偿金计算', desc: '精确计算' },
              { id: 'process' as const, label: '⑤ 流程指引', desc: '仲裁全流程' },
              { id: 'templates' as const, label: '⑥ 文书模板', desc: '直接可用' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                disabled={tab.id !== 'diagnosis' && tab.id !== 'assessment' && selectedTypes.length === 0}
                className={`flex-1 min-w-[120px] px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 border-b-2 border-blue-600 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${tab.id !== 'diagnosis' && tab.id !== 'assessment' && selectedTypes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="font-medium text-sm">{tab.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{tab.desc}</div>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'diagnosis' && (
              <DiagnosisSection selectedTypes={selectedTypes} onChange={setSelectedTypes} />
            )}
            {activeTab === 'assessment' && (
              <AssessmentSection selectedTypes={selectedTypes} />
            )}
            {activeTab === 'evidence' && (
              <EvidenceSection selectedTypes={selectedTypes} />
            )}
            {activeTab === 'calculator' && (
              <CalculatorSection selectedTypes={selectedTypes} />
            )}
            {activeTab === 'process' && (
              <ProcessSection selectedTypes={selectedTypes} />
            )}
            {activeTab === 'templates' && (
              <TemplatesSection />
            )}
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 mt-6 mb-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs text-yellow-800">
          <p className="font-bold mb-1">⚠️ 重要声明</p>
          <p>本工具仅为法律信息整理工具，不构成法律建议。计算结果仅供参考，各地仲裁委/法院口径可能存在差异。涉及重大利益时，建议咨询专业劳动法律师。</p>
          <p className="mt-2 text-yellow-600">数据更新日期：2025年4月 | 数据来源：各省市人社部门公报、裁判文书网</p>
        </div>
      </div>
    </div>
  );
}
