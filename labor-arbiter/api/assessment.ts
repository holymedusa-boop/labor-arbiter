// AI Assessment Prompts & Service for Labor Arbitration MVP
// Uses Moonshot/Kimi API (compatible with OpenAI format)
// Falls back to intelligent mock data if API is unavailable

export interface AssessmentInput {
  city: string;
  disputeTypes: string[];
  years: number;
  salary: number;
  entryYear?: number;
  entryMonth?: number;
  description?: string;
  evidenceStatus?: Record<string, boolean>;
}

export interface AssessmentResult {
  summary: string;
  winProbability: {
    overall: number;
    confidence: 'high' | 'medium' | 'low';
  };
  claimableRights: {
    right: string;
    estimatedAmount: number;
    legalBasis: string;
    probability: number;
    notes: string;
  }[];
  keyEvidence: {
    name: string;
    importance: 'essential' | 'important' | 'helpful';
    howToGet: string;
    tips: string;
    alreadyHave?: boolean;
  }[];
  riskWarnings: string[];
  timeline: {
    step: string;
    duration: string;
    tips: string;
  }[];
  legalBasis: string[];
  recommendedAction: string;
  uncertaintyNotes: string;
  disclaimer: string;
}

const SYSTEM_PROMPT = `你是一名专业的中国劳动法律分析师。你的任务是根据用户提供的劳动纠纷案情，给出结构化的法律分析报告。

## 核心原则
1. 诚实优先于完美：不确定的地方明确标注，绝不编造法条或判例
2. 所有输出必须基于现行有效的中国劳动法律法规
3. 地域规则差异需明确标注适用城市和置信度
4. 每条法律建议必须附带具体的法条依据

## 输出格式要求
你必须返回一个严格的JSON对象，格式如下：
{
  "summary": "案情摘要（2-3句话）",
  "winProbability": {
    "overall": 0-100的数字,
    "confidence": "high|medium|low"
  },
  "claimableRights": [
    {
      "right": "可主张的权益名称",
      "estimatedAmount": 估算金额数字,
      "legalBasis": "具体法条依据，如《劳动合同法》第47条",
      "probability": 0-100,
      "notes": "金额计算说明和注意事项"
    }
  ],
  "keyEvidence": [
    {
      "name": "证据名称",
      "importance": "essential|important|helpful",
      "howToGet": "获取方式",
      "tips": "关键提示",
      "alreadyHave": false
    }
  ],
  "riskWarnings": ["风险提示1", "风险提示2"],
  "timeline": [
    {"step": "步骤名称", "duration": "预计时长", "tips": "注意事项"}
  ],
  "legalBasis": ["《劳动合同法》第X条", "《劳动争议调解仲裁法》第X条"],
  "recommendedAction": "推荐的下一步行动（具体、可执行）",
  "uncertaintyNotes": "需要用户补充的信息或不确定因素的说明",
  "disclaimer": "本分析仅供参考，不构成法律建议。具体结果以当地仲裁委/法院裁决为准。"
}

## 金额计算规则
- 经济补偿金N = 工作年限 × 离职前12个月平均工资
- 违法解除赔偿金2N = 2 × 工作年限 × 离职前12个月平均工资
- 月工资高于当地社平工资3倍的，基数按3倍封顶，年限最高12年（2008年后）
- 2008年前入职的需分段计算
- 未签劳动合同二倍工资 = 月工资 × 未签月份（最多11个月）
- 年休假工资 = 日工资 × 未休天数 × 200%
- 加班费：工作日1.5倍、休息日2倍、法定假日3倍

## 地域差异处理
- 经济补偿金基数是否包含加班费：北京/深圳/杭州/南京含加班费；上海/成都不含
- 社保争议受理：上海仲裁委不受理，需向社保中心投诉；北京/深圳/广州可仲裁
- 年休假按累计工龄计算，不限于同一公司

## 反幻觉约束
- 禁止编造法条编号或司法解释名称
- 禁止引用不存在的判例
- 禁止给出绝对化的"必胜"承诺
- 涉及金额计算必须展示公式
- 地域规则不明确时标注"建议咨询当地律师"

## 回答前自检清单
1. 所有法条编号是否正确？
2. 金额计算是否展示了公式？
3. 地域规则是否标注了适用城市？
4. 不确定的地方是否标注了置信度？
5. 是否包含了免责声明？`;

function buildUserPrompt(input: AssessmentInput): string {
  const { city, disputeTypes, years, salary, entryYear, entryMonth, description, evidenceStatus } = input;

  let evidenceSection = '';
  if (evidenceStatus && Object.keys(evidenceStatus).length > 0) {
    const have = Object.entries(evidenceStatus).filter(([, v]) => v).map(([k]) => k);
    const miss = Object.entries(evidenceStatus).filter(([, v]) => !v).map(([k]) => k);
    evidenceSection = `\n## 用户已收集的证据\n- 已持有：${have.join('、') || '无'}\n- 缺失：${miss.join('、') || '无'}`;
  }

  return `## 案情信息
- 所在城市：${city}
- 纠纷类型：${disputeTypes.join('、')}
- 工作年限：${years}年
- 月平均工资：¥${salary}
- 入职时间：${entryYear ? `${entryYear}年${entryMonth || 1}月` : '未提供'}
- 用户补充描述：${description || '无'}
${evidenceSection}

请基于以上信息，给出完整的结构化法律分析报告。`;
}

// Moonshot API client (OpenAI-compatible)
const API_BASE = 'https://api.moonshot.cn/v1';
const MODEL = 'moonshot-v1-8k';

async function callMoonshotAPI(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const response = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Moonshot API error ${response.status}: ${text}`);
  }

  const data = await response.json() as any;
  return data.choices?.[0]?.message?.content || '';
}

// ---- Intelligent Mock Fallback ----
// When the API is unavailable, generate realistic structured data based on inputs

function generateMockAssessment(input: AssessmentInput): AssessmentResult {
  const { city, disputeTypes, years, salary } = input;
  const avgSalary3x = 35000; // rough cap for demo
  const base = Math.min(salary, avgSalary3x);
  const n = years;

  const rights: AssessmentResult['claimableRights'] = [];
  const evidence: AssessmentResult['keyEvidence'] = [];
  const risks: string[] = [];
  const timeline: AssessmentResult['timeline'] = [];
  const legalBasis: string[] = [];

  // Build rights based on dispute types
  if (disputeTypes.includes('illegal_termination')) {
    const amount = Math.round(base * n * 2);
    rights.push({
      right: '违法解除劳动合同赔偿金（2N）',
      estimatedAmount: amount,
      legalBasis: '《劳动合同法》第87条',
      probability: 75,
      notes: `赔偿金 = 离职前12个月平均工资 × 工作年限 × 2。您的基数约为¥${base}/月，工作年限${n}年，估算金额¥${amount.toLocaleString()}。如工资高于社平工资3倍则基数封顶。`,
    });
    legalBasis.push('《劳动合同法》第87条', '《劳动合同法》第47条');
    evidence.push(
      { name: '辞退通知书/解除通知', importance: 'essential', howToGet: '要求公司出具书面通知并盖章；如口头辞退，立即录音并要求书面确认', tips: '口头辞退无效！必须书面。如公司拒出书面通知，继续正常上班打卡。' },
      { name: '劳动合同', importance: 'essential', howToGet: '入职时签订的那份；如公司没给，用工资流水+社保记录替代', tips: '全案由核心证据，证明劳动关系存在和薪资标准。' },
      { name: '工资发放记录（银行流水）', importance: 'essential', howToGet: '银行APP导出PDF流水', tips: '导出时标注"工资"字样，作为计算基数的核心证据。' }
    );
    risks.push('公司可能主张"合法解除"，需证明解除理由不成立');
    risks.push('2008年前入职需分段计算赔偿金基数和年限上限');
  }

  if (disputeTypes.includes('wage_arrears')) {
    const months = 3; // assume 3 months for demo
    const amount = Math.round(salary * months);
    rights.push({
      right: '拖欠工资',
      estimatedAmount: amount,
      legalBasis: '《劳动合同法》第30条',
      probability: 90,
      notes: `欠薪金额 = 月工资 × 拖欠月数。如拖欠${months}个月，估算¥${amount.toLocaleString()}。`,
    });
    legalBasis.push('《劳动合同法》第30条');
    evidence.push(
      { name: '工资银行流水', importance: 'essential', howToGet: '银行APP导出PDF流水，标注工资到账记录', tips: '对比应发与实发，标注差额月份。' },
      { name: '催讨工资记录', importance: 'important', howToGet: '微信/钉钉催讨记录截图', tips: '证明催告事实，部分城市要求先催告。' }
    );
    risks.push('如公司经营困难，执行阶段可能面临财产保全问题');
  }

  if (disputeTypes.includes('no_contract')) {
    const months = Math.min(11, Math.max(1, Math.floor(n * 12) - 1));
    const amount = Math.round(salary * months);
    rights.push({
      right: '未签劳动合同二倍工资差额',
      estimatedAmount: amount,
      legalBasis: '《劳动合同法》第82条',
      probability: 70,
      notes: `最多可主张11个月（入职第2个月至第12个月）。估算¥${amount.toLocaleString()}。注意仲裁时效！`,
    });
    legalBasis.push('《劳动合同法》第82条', '《劳动合同法实施条例》第6条');
    evidence.push(
      { name: '工资流水+社保记录', importance: 'essential', howToGet: '银行APP导出、支付宝社保查询', tips: '证明事实劳动关系存在和入职时间。' },
      { name: '入职通知/offer邮件', importance: 'important', howToGet: '查找入职时的邮件或微信记录', tips: '证明入职日期，确定二倍工资起算时间。' }
    );
    risks.push('各地对二倍工资仲裁时效计算方式不同，部分城市按月拆分计算时效');
  }

  if (disputeTypes.includes('overtime_pay')) {
    const amount = Math.round(salary * 0.3); // rough estimate
    rights.push({
      right: '加班费差额',
      estimatedAmount: amount,
      legalBasis: '《劳动法》第44条',
      probability: 60,
      notes: `需根据实际加班小时数计算。工作日1.5倍、休息日2倍、法定假日3倍。估算金额仅供参考。`,
    });
    legalBasis.push('《劳动法》第44条');
    evidence.push(
      { name: '考勤记录', importance: 'essential', howToGet: '钉钉/企业微信导出打卡记录', tips: '未经审批但实际加班也有效。' },
      { name: '工作群聊天记录', importance: 'important', howToGet: '截图保存非工作时间的工作沟通', tips: '截图要包含时间和内容。' }
    );
    risks.push('加班费争议举证难度较高，需证明实际加班事实');
    risks.push('部分地区仲裁时效为1年，注意时效风险');
  }

  if (disputeTypes.includes('forced_resignation')) {
    const amount = Math.round(base * n);
    rights.push({
      right: '被迫离职经济补偿金（N）',
      estimatedAmount: amount,
      legalBasis: '《劳动合同法》第38条、第46条',
      probability: 65,
      notes: `经济补偿金 = 离职前12个月平均工资 × 工作年限。估算¥${amount.toLocaleString()}。必须先发书面催告！`,
    });
    legalBasis.push('《劳动合同法》第38条', '《劳动合同法》第46条');
    evidence.push(
      { name: '书面催告函+邮寄底单', importance: 'essential', howToGet: 'EMS邮寄《催告函》，留存邮寄底单+签收记录', tips: '【关键步骤】必须先催告再给期限（7-15天），否则可能被认定为"主动辞职"。' },
      { name: '被迫解除劳动合同通知书', importance: 'essential', howToGet: 'EMS邮寄，留存底单', tips: '明确依据《劳动合同法》第38条，列明公司违法事实。' }
    );
    risks.push('如未履行催告程序，可能被认定为"主动辞职"，无法主张经济补偿');
  }

  if (disputeTypes.includes('social_insurance')) {
    rights.push({
      right: '社保/公积金补缴',
      estimatedAmount: 0,
      legalBasis: '《社会保险法》第63条、第86条',
      probability: 80,
      notes: '社保争议主要是补缴，不是直接支付赔偿金。可向社保中心投诉要求补缴。',
    });
    legalBasis.push('《社会保险法》第63条');
    evidence.push(
      { name: '社保缴费记录', importance: 'essential', howToGet: '支付宝/微信搜索"社保查询"', tips: '对比应缴基数与实缴基数。' }
    );
    risks.push('上海仲裁委不受理社保争议，需向社保中心投诉');
    risks.push('补缴金额由社保局核算，非现金赔偿');
  }

  if (disputeTypes.includes('annual_leave')) {
    const daily = Math.round(salary / 21.75);
    const days = n < 1 ? 0 : n < 10 ? 5 : n < 20 ? 10 : 15;
    const amount = Math.round(daily * days * 2);
    rights.push({
      right: '未休年休假工资',
      estimatedAmount: amount,
      legalBasis: '《职工带薪年休假条例》第5条',
      probability: 75,
      notes: `日工资 = 月工资 ÷ 21.75 = ¥${daily}，年休假${days}天，未休工资 = 日工资 × 未休天数 × 200%。估算¥${amount.toLocaleString()}。`,
    });
    legalBasis.push('《职工带薪年休假条例》第3条', '《职工带薪年休假条例》第5条');
    evidence.push(
      { name: '社保缴费记录（证明连续工龄）', importance: 'essential', howToGet: '支付宝/微信社保查询', tips: '年休假按累计工龄计算，不限于同一公司。' }
    );
    risks.push('需证明已连续工作满12个月');
  }

  // Common timeline
  timeline.push(
    { step: '收集证据', duration: '1-2周', tips: '按证据清单逐项收集，优先收集必需项' },
    { step: '确认管辖仲裁委', duration: '1天', tips: '向劳动合同履行地或用人单位所在地仲裁委申请' },
    { step: '撰写仲裁申请书', duration: '2-3天', tips: '明确请求事项、事实与理由' },
    { step: '提交申请并等待立案', duration: '5个工作日', tips: '提交一式三份，保留受理回执' },
    { step: '开庭审理', duration: '1-2次庭审', tips: '公司负举证责任时重点应对' },
    { step: '裁决与执行', duration: '45-60日', tips: '不服裁决15日内可起诉；公司不履行可申请强制执行' }
  );

  // Common evidence for all cases
  evidence.push(
    { name: '公司工商信息', importance: 'important', howToGet: '国家企业信用信息公示系统或企查查', tips: '确定被申请人主体，确保仲裁申请书中公司名称准确。' }
  );

  // Calculate total estimated amount
  const totalAmount = rights.reduce((sum, r) => sum + r.estimatedAmount, 0);

  // Summary
  const typeNames: Record<string, string> = {
    illegal_termination: '违法解除',
    forced_resignation: '被迫离职',
    wage_arrears: '拖欠工资',
    overtime_pay: '加班费',
    no_contract: '未签劳动合同',
    social_insurance: '社保争议',
    annual_leave: '年休假',
    probation_issue: '试用期争议',
    work_injury: '工伤待遇',
  };
  const typeDesc = disputeTypes.map(t => typeNames[t] || t).join('、');

  return {
    summary: `用户在${city}工作${years}年，月平均工资¥${salary.toLocaleString()}，涉及${typeDesc}纠纷。经初步分析，预估可主张权益总额约¥${totalAmount.toLocaleString()}。`,
    winProbability: {
      overall: rights.length > 0 ? Math.round(rights.reduce((s, r) => s + r.probability, 0) / rights.length) : 50,
      confidence: rights.length > 0 ? 'medium' : 'low',
    },
    claimableRights: rights,
    keyEvidence: evidence,
    riskWarnings: risks,
    timeline,
    legalBasis: [...new Set(legalBasis)],
    recommendedAction: rights.length > 0
      ? `优先收集${evidence.filter(e => e.importance === 'essential').map(e => `「${e.name}」`).join('、')}，然后在30日内向${city}劳动人事争议仲裁委提交仲裁申请。`
      : '建议补充更多案情细节后重新分析，或咨询当地劳动法律师。',
    uncertaintyNotes: '估算金额基于您提供的平均工资和工作年限，实际金额可能因年终奖、加班费、地域规则差异而有所不同。',
    disclaimer: '【演示模式】本分析为基于规则的智能估算，非真实AI大模型输出。仅供流程演示使用。接入真实大模型后，分析将更加个性化和精准。本工具不构成法律建议。',
  };
}

export async function runAssessment(input: AssessmentInput): Promise<AssessmentResult> {
  const apiKey = process.env.KIMI_API_KEY || process.env.KIMI_PLUGIN_API_KEY || process.env.OPENAI_API_KEY || '';

  // If no API key or in demo mode, use intelligent mock
  if (!apiKey || process.env.USE_MOCK_ASSESSMENT === 'true') {
    return generateMockAssessment(input);
  }

  try {
    const userPrompt = buildUserPrompt(input);
    const raw = await callMoonshotAPI(SYSTEM_PROMPT, userPrompt, apiKey);

    const parsed = JSON.parse(raw) as AssessmentResult;
    if (!parsed.disclaimer) {
      parsed.disclaimer = '本分析仅供参考，不构成法律建议。具体结果以当地仲裁委/法院裁决为准。';
    }
    return parsed;
  } catch (e) {
    // If API fails, fall back to mock
    console.warn('AI API failed, falling back to mock assessment:', (e as Error).message);
    return generateMockAssessment(input);
  }
}
