import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { DisputeType, evidenceDatabase, EvidenceItem } from '../data/laborLawData';

interface Props {
  selectedTypes: DisputeType[];
}

export default function EvidenceSection({ selectedTypes }: Props) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('evidenceChecked');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('evidenceChecked', JSON.stringify([...checkedItems]));
  }, [checkedItems]);

  const toggleExpand = (key: string) => {
    const next = new Set(expandedItems);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setExpandedItems(next);
  };

  const toggleCheck = (key: string) => {
    const next = new Set(checkedItems);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCheckedItems(next);
  };

  const importanceClass = (level: string) => {
    switch (level) {
      case 'essential': return 'bg-red-50 border-red-200 text-red-700';
      case 'important': return 'bg-orange-50 border-orange-200 text-orange-700';
      default: return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const importanceLabel = (level: string) => {
    switch (level) {
      case 'essential': return '必需';
      case 'important': return '重要';
      default: return '辅助';
    }
  };

  const allEvidence = selectedTypes.flatMap((type) => {
    const cats = evidenceDatabase[type] || [];
    return cats.flatMap((cat) =>
      cat.items.map((item) => ({ ...item, category: cat.category, type }))
    );
  });

  // Deduplicate by name within category
  const seen = new Set<string>();
  const uniqueEvidence = allEvidence.filter((item) => {
    const key = `${item.category}-${item.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const grouped = uniqueEvidence.reduce<Record<string, typeof uniqueEvidence>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const checkedCount = uniqueEvidence.filter((item) =>
    checkedItems.has(`${item.category}-${item.name}`)
  ).length;

  const essentialCount = uniqueEvidence.filter((i) => i.importance === 'essential').length;
  const essentialChecked = uniqueEvidence.filter(
    (i) => i.importance === 'essential' && checkedItems.has(`${i.category}-${i.name}`)
  ).length;

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">个性化证据清单</h3>
        <p className="text-sm text-gray-500">
          已选择 {selectedTypes.length} 种纠纷类型，共 {uniqueEvidence.length} 项证据建议
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-blue-800">
          <CheckCircle className="w-4 h-4" />
          <span>
            已收集 {checkedCount}/{uniqueEvidence.length} 项（必需项 {essentialChecked}/{essentialCount}）
          </span>
        </div>
        <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${uniqueEvidence.length ? (checkedCount / uniqueEvidence.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h4 className="font-semibold text-gray-800 text-sm mb-2 px-1">{category}</h4>
          <div className="space-y-2">
            {items.map((item) => {
              const key = `${item.category}-${item.name}`;
              const isChecked = checkedItems.has(key);
              const isExpanded = expandedItems.has(key);

              return (
                <div
                  key={key}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    isChecked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3 p-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(key)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-gray-900">{item.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${importanceClass(item.importance)}`}>
                          {importanceLabel(item.importance)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => toggleExpand(key)}
                      className="text-gray-400 hover:text-gray-600 shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-3 pb-3 pl-10 space-y-2">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">获取方式</p>
                          <p className="text-xs text-gray-600">{item.howToGet}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">关键提示</p>
                          <p className="text-xs text-gray-600">{item.tips}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">法律依据</p>
                          <p className="text-xs text-gray-600">{item.legalBasis}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {uniqueEvidence.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          请先选择纠纷类型，系统将自动生成对应证据清单
        </div>
      )}
    </div>
  );
}
