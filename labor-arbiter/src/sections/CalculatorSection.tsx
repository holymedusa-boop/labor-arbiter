import React, { useState } from 'react';
import { Calculator, AlertTriangle, Info, MapPin } from 'lucide-react';
import { DisputeType, calculateCompensation, cityData, cities, disputeTypes } from '../data/laborLawData';

interface Props {
  selectedTypes: DisputeType[];
}

export default function CalculatorSection({ selectedTypes }: Props) {
  const [city, setCity] = useState('北京');
  const [years, setYears] = useState('');
  const [salary, setSalary] = useState('');
  const [entryYear, setEntryYear] = useState('');
  const [entryMonth, setEntryMonth] = useState('');
  const [overtime, setOvertime] = useState({ weekday: '', restDay: '', holiday: '' });
  const [activeType, setActiveType] = useState<DisputeType | null>(selectedTypes[0] || null);
  const [result, setResult] = useState<ReturnType<typeof calculateCompensation> | null>(null);

  const filteredTypes = selectedTypes.length > 0 ? selectedTypes : disputeTypes.map(t => t.id);

  const handleCalculate = () => {
    if (!activeType) return;
    const res = calculateCompensation(
      activeType,
      city,
      parseFloat(years) || 0,
      parseFloat(salary) || 0,
      entryYear ? parseInt(entryYear) : undefined,
      entryMonth ? parseInt(entryMonth) : undefined,
      activeType === 'overtime_pay' ? {
        weekday: parseFloat(overtime.weekday) || 0,
        restDay: parseFloat(overtime.restDay) || 0,
        holiday: parseFloat(overtime.holiday) || 0,
      } : undefined
    );
    setResult(res);
  };

  const cityInfo = cityData[city];

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">赔偿金/补偿金计算</h3>
        <p className="text-sm text-gray-500">选择纠纷类型并输入基本信息，系统将按最新地域规则精确计算</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 输入区 */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">纠纷类型</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {filteredTypes.map((type) => {
                const info = disputeTypes.find(t => t.id === type);
                return (
                  <button
                    key={type}
                    onClick={() => { setActiveType(type); setResult(null); }}
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
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">所在城市</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {cityInfo && (
              <p className="text-xs text-gray-500 mt-1">
                <MapPin className="w-3 h-3 inline" /> 社平工资 ¥{cityInfo.avgSalary}/月 | 最低工资 ¥{cityInfo.minWage}/月
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">工作年限（年）</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="如：3.5"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">月平均工资（元）</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="税前月均"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">入职年份（选填）</label>
              <input
                type="number"
                value={entryYear}
                onChange={(e) => setEntryYear(e.target.value)}
                placeholder="如：2015"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">入职月份（选填）</label>
              <input
                type="number"
                value={entryMonth}
                onChange={(e) => setEntryMonth(e.target.value)}
                placeholder="1-12"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          {activeType === 'overtime_pay' && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">工作日延时（小时）</label>
                <input
                  type="number"
                  value={overtime.weekday}
                  onChange={(e) => setOvertime({ ...overtime, weekday: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">休息日加班（小时）</label>
                <input
                  type="number"
                  value={overtime.restDay}
                  onChange={(e) => setOvertime({ ...overtime, restDay: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">法定假日（小时）</label>
                <input
                  type="number"
                  value={overtime.holiday}
                  onChange={(e) => setOvertime({ ...overtime, holiday: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleCalculate}
            disabled={!activeType || !salary}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Calculator className="w-4 h-4 inline mr-1" />
            开始计算
          </button>
        </div>

        {/* 结果区 */}
        <div>
          {!result ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-500 text-sm">
              <Calculator className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>输入信息后点击计算，结果将在此显示</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <p className="text-xs text-blue-100">计算结果</p>
                <p className="text-3xl font-bold mt-1">
                  {result.totalCompensation > 0 ? `¥${result.totalCompensation.toLocaleString()}` : '—'}
                </p>
                <p className="text-xs text-blue-100 mt-1">{result.formula}</p>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">计算说明</p>
                  <p className="text-xs text-gray-600 whitespace-pre-line">{result.explanation}</p>
                </div>

                {result.segments && (
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-medium text-gray-700">分段计算详情</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">2008年前段（{result.segments.pre2008.years.toFixed(1)}年）</span>
                      <span className="font-medium">¥{result.segments.pre2008.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">2008年后段（{result.segments.post2008.years.toFixed(1)}年）</span>
                      <span className="font-medium">¥{result.segments.post2008.amount.toLocaleString()}</span>
                    </div>
                    {result.segments.capped && (
                      <div className="text-xs text-orange-600">⚠️ 基数已按社平工资3倍封顶</div>
                    )}
                  </div>
                )}

                <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">{result.warning}</p>
                </div>

                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">{result.legalBasis}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
