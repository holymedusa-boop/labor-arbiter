import React, { useState } from 'react';
import { Clock, FileText, AlertCircle, ChevronRight, CheckCircle } from 'lucide-react';
import { DisputeType, arbitrationProcess, disputeTypes } from '../data/laborLawData';

interface Props {
  selectedTypes: DisputeType[];
}

export default function ProcessSection({ selectedTypes }: Props) {
  const [activeType, setActiveType] = useState<DisputeType | null>(selectedTypes[0] || null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const filteredTypes = selectedTypes.length > 0 ? selectedTypes : disputeTypes.map(t => t.id);
  const steps = activeType ? (arbitrationProcess[activeType] || []) : [];

  const toggleStep = (idx: number) => {
    const next = new Set(completedSteps);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setCompletedSteps(next);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">仲裁全流程指引</h3>
        <p className="text-sm text-gray-500">选择纠纷类型查看对应的仲裁流程、时间节点和注意事项</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {filteredTypes.map((type) => {
          const info = disputeTypes.find(t => t.id === type);
          return (
            <button
              key={type}
              onClick={() => { setActiveType(type); setCompletedSteps(new Set()); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                activeType === type
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {info?.name}
            </button>
          );
        })}
      </div>

      {steps.length > 0 ? (
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const isCompleted = completedSteps.has(idx);
            return (
              <div
                key={idx}
                className={`border rounded-xl overflow-hidden transition-all ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3 p-4">
                  <button
                    onClick={() => toggleStep(idx)}
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400 hover:border-blue-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs">{idx + 1}</span>}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`font-semibold text-sm ${isCompleted ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                        {step.title}
                      </h4>
                      {step.duration && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{step.description}</p>

                    {step.documents && step.documents.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {step.documents.map((doc) => (
                          <span key={doc} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> {doc}
                          </span>
                        ))}
                      </div>
                    )}

                    {step.tips && (
                      <div className="flex items-start gap-1.5 mt-2">
                        <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-orange-700">{step.tips}</p>
                      </div>
                    )}

                    {step.lawRef && (
                      <p className="text-xs text-gray-400 mt-2">{step.lawRef}</p>
                    )}
                  </div>

                  {idx < steps.length - 1 && !isCompleted && (
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 self-center" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 text-sm">
          请先选择纠纷类型查看对应流程
        </div>
      )}
    </div>
  );
}
