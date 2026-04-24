import React, { useState } from 'react';
import { FileText, Download, Copy, CheckCircle } from 'lucide-react';
import { documentTemplates } from '../data/laborLawData';

export default function TemplatesSection() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [copied, setCopied] = useState(false);

  const template = documentTemplates[activeTemplate];

  const handleCopy = () => {
    navigator.clipboard.writeText(template.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([template.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.downloadName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">文书模板</h3>
        <p className="text-sm text-gray-500">可直接使用的仲裁文书模板，复制后按需填写</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {documentTemplates.map((t, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveTemplate(idx); setCopied(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeTemplate === idx
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{template.title}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
              <span>{copied ? '已复制' : '复制'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下载</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed bg-gray-50 rounded-lg p-4 overflow-auto max-h-[600px]">
            {template.content}
          </pre>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          <span className="font-bold">使用提示：</span>方括号 [ ] 中的内容需要替换为您的实际信息。建议填写后由律师复核确认。
        </p>
      </div>
    </div>
  );
}
