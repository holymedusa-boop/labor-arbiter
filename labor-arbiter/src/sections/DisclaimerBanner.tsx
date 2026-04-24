import React from 'react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-800 text-xs">
          <span className="font-bold">⚠️ 法律信息工具</span>
          <span>仅供参考，不构成法律建议</span>
        </div>
        <span className="text-amber-600 text-xs">数据更新：2025年4月</span>
      </div>
    </div>
  );
}
