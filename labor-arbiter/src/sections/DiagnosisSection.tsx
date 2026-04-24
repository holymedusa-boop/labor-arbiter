import React from 'react';
import { Check, AlertTriangle, LogOut, DollarSign, Clock, FileX, Shield, Calendar, UserCheck, HeartPulse } from 'lucide-react';
import { DisputeType, disputeTypes } from '../data/laborLawData';

const iconMap: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  LogOut: <LogOut className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  FileX: <FileX className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
};

interface Props {
  selectedTypes: DisputeType[];
  onChange: (types: DisputeType[]) => void;
}

export default function DiagnosisSection({ selectedTypes, onChange }: Props) {
  const toggleType = (id: DisputeType) => {
    if (selectedTypes.includes(id)) {
      onChange(selectedTypes.filter((t) => t !== id));
    } else {
      onChange([...selectedTypes, id]);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">请选择您遇到的纠纷类型（可多选）</h3>
        <p className="text-sm text-gray-500">现实中劳动纠纷往往是复合型的，勾选所有符合的情况</p>
      </div>

      {selectedTypes.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800 text-sm font-medium">
            <Check className="w-4 h-4" />
            已选择 {selectedTypes.length} 项：
            {selectedTypes.map((t) => disputeTypes.find((dt) => dt.id === t)?.name).join(' + ')}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {disputeTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.id);
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                  {iconMap[type.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{type.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                  {type.commonCombo && type.commonCombo.length > 0 && (
                    <p className="text-xs text-blue-600 mt-1.5">
                      常与 {type.commonCombo.map((c) => disputeTypes.find((dt) => dt.id === c)?.name).filter(Boolean).join('、')} 同时出现
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedTypes.length === 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-gray-500 text-sm">
          请至少选择一项纠纷类型，后续的证据清单和赔偿金计算将根据您的选择自动生成
        </div>
      )}
    </div>
  );
}
