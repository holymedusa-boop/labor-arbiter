import React, { useState } from 'react';
import { trpc } from '../lib/trpc';
import { Brain, Loader2, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Scale, Clock, FileText, Lightbulb, ShieldAlert } from 'lucide-react';
import { DisputeType, disputeTypes, cityData } from '../data/laborLawData';

interface Props {
  selectedTypes: DisputeType[];
}

export default function AssessmentSection({ selectedTypes }: Props) {
  const [city, setCity] = useState('北京');
  const [years, setYears] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const mutation = trpc.assessment.useMutation();

  const handleAnalyze = () => {
    if (!selectedTypes.length || !years || !salary) return;
    mutation.mutate({
      city,
      disputeTypes: selectedTypes,
      years: parseFloat(years),
      salary: parseFloat(salary),
      description: description || undefined,
    });
  };

  const toggle = (key: string) => {
    const next = new Set(expanded);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setExpanded(next);
  };

  const result = mutation.data;

  const confidenceColor = (c: string) => {
    switch (c) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-orange-600 bg-orange-50 border-orange-200';
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">AI 智能案情分析</h3>
        <p className="text-sm text-gray-500">输入基本信息，AI 将分析您的案情并给出胜率预估、可主张权益和取证建议</p>
      </div>

      {/* 输入区 */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700">所在城市</label>
            <select value={city} onChange={e => setCity(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm">
              {Object.keys(cityData).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">工作年限</label>
            <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="如 3.5" className="mt-1 w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">月平均工资（元）</label>
          <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="税前月均" className="mt-1 w-full px-3 py-2 border rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">案情补充描述（选填）</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="如：公司口头辞退、拖欠3个月工资、未签劳动合同..." rows={3} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm" />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={mutation.isPending || !selectedTypes.length || !years || !salary}
          className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
          {mutation.isPending ? 'AI 分析中...' : '开始 AI 案情分析'}
        </button>

        {selectedTypes.length === 0 && (
          <p className="text-xs text-orange-600 text-center">请先在「纠纷诊断」中选择至少一种纠纷类型</p>
        )}
      </div>

      {/* 结果区 */}
      {result && (
        <div className="space-y-4">
          {/* 概览卡片 */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-100">AI 案情分析摘要</p>
                <p className="text-sm mt-1 leading-relaxed">{result.summary}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs text-indigo-100">胜率预估</p>
                <p className="text-3xl font-bold">{result.winProbability.overall}%</p>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mt-1 ${confidenceColor(result.winProbability.confidence)}`}>
                  {result.winProbability.confidence === 'high' ? '高置信度' : result.winProbability.confidence === 'medium' ? '中置信度' : '低置信度'}
                </span>
              </div>
            </div>
          </div>

          {/* 可主张权益 */}
          {result.claimableRights && result.claimableRights.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">可主张权益清单</span>
              </div>
              <div className="divide-y">
                {result.claimableRights.map((right, idx) => (
                  <div key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900">{right.right}</span>
                      <span className="text-sm font-bold text-indigo-600">¥{right.estimatedAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{right.legalBasis}</p>
                    <p className="text-xs text-gray-600 mt-1">{right.notes}</p>
                    <div className="mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${right.probability >= 70 ? 'bg-green-50 border-green-200 text-green-700' : right.probability >= 40 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-orange-50 border-orange-200 text-orange-700'}`}>
                        胜算 {right.probability}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 关键证据 */}
          {result.keyEvidence && result.keyEvidence.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">关键证据清单</span>
              </div>
              <div className="p-4 space-y-2">
                {result.keyEvidence.map((ev, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${ev.importance === 'essential' ? 'bg-red-50 border-red-200 text-red-700' : ev.importance === 'important' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                        {ev.importance === 'essential' ? '必需' : ev.importance === 'important' ? '重要' : '辅助'}
                      </span>
                      <span className="font-medium text-sm text-gray-900">{ev.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{ev.howToGet}</p>
                    <p className="text-xs text-orange-600 mt-0.5">{ev.tips}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 风险提示 */}
          {result.riskWarnings && result.riskWarnings.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">风险提示</span>
              </div>
              <ul className="space-y-1">
                {result.riskWarnings.map((w, i) => (
                  <li key={i} className="text-xs text-orange-700 flex items-start gap-1.5">
                    <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 时间线 */}
          {result.timeline && result.timeline.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">预计时间线</span>
              </div>
              <div className="p-4 space-y-3">
                {result.timeline.map((t, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{t.step}</span>
                        <span className="text-xs text-gray-500">{t.duration}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{t.tips}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 法律依据 */}
          {result.legalBasis && result.legalBasis.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">法律依据</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.legalBasis.map((lb, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-700">{lb}</span>
                ))}
              </div>
            </div>
          )}

          {/* 推荐行动 */}
          {result.recommendedAction && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-800">推荐下一步行动</span>
              </div>
              <p className="text-sm text-indigo-700">{result.recommendedAction}</p>
            </div>
          )}

          {/* 不确定性 */}
          {result.uncertaintyNotes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-xs text-yellow-800">
                <span className="font-bold">需补充信息：</span>{result.uncertaintyNotes}
              </p>
            </div>
          )}

          {/* 免责声明 */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
            <p className="text-xs text-gray-500">{result.disclaimer || '本分析仅供参考，不构成法律建议。具体结果以当地仲裁委/法院裁决为准。'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
