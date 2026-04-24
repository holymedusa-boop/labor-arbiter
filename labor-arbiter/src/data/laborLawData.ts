// ====== 城市基础数据（2024-2025年最新官方数据）======
export interface CityData {
  avgSalary: number;        // 上年度社平工资（元/月）
  minWage: number;          // 最低工资标准（元/月）
  severanceBase: string;    // 经济补偿金计算基数口径
  severanceConfidence: 'high' | 'medium' | 'low';
  overtimeBase: string;     // 加班费计算基数口径
  notes: string;            // 地区特殊说明
}

export const cityData: Record<string, CityData> = {
  '北京': {
    avgSalary: 11937,
    minWage: 2540,
    severanceBase: '包含加班费（京高法发〔2024〕534号）',
    severanceConfidence: 'high',
    overtimeBase: '包含加班费，按实际工资计算',
    notes: '经济补偿金包含加班费；赔偿金与经济补偿金口径一致'
  },
  '上海': {
    avgSalary: 12434,
    minWage: 2740,
    severanceBase: '不含加班费（上海高院2013年问答）',
    severanceConfidence: 'high',
    overtimeBase: '不含加班费，无约定时按正常出勤月工资的70%计算',
    notes: '经济补偿金不含加班费；赔偿金不能分段计算（上海口径）'
  },
  '广州': {
    avgSalary: 9183,
    minWage: 2500,
    severanceBase: '广东省统一口径，年终奖计入',
    severanceConfidence: 'high',
    overtimeBase: '含加班费，按实际工资计算',
    notes: '广东省统一基数'
  },
  '深圳': {
    avgSalary: 9183,
    minWage: 2520,
    severanceBase: '包含加班费（深圳中院裁判指引），年终奖分摊12个月计入',
    severanceConfidence: 'high',
    overtimeBase: '含加班费，加班工资最低基数不能低于最低工资标准按小时折算',
    notes: '经济补偿金包含加班费；赔偿金与经济补偿金口径一致'
  },
  '杭州': {
    avgSalary: 8433,
    minWage: 2490,
    severanceBase: '包含加班费（杭州中院2009年意见）',
    severanceConfidence: 'high',
    overtimeBase: '含加班费',
    notes: '浙江停工留薪期按工伤医疗机构出具的病假单计算'
  },
  '南京': {
    avgSalary: 8254,
    minWage: 2490,
    severanceBase: '包含加班费（苏劳人仲委〔2017〕1号）',
    severanceConfidence: 'high',
    overtimeBase: '含加班费',
    notes: '经济补偿金包含加班费'
  },
  '成都': {
    avgSalary: 7646,
    minWage: 2330,
    severanceBase: '不含加班费（川高法民一〔2016〕1号），非常规性奖金、津补贴不计入',
    severanceConfidence: 'high',
    overtimeBase: '不含加班费',
    notes: '经济补偿金不含加班费；年终奖是否计入存在争议'
  },
  '武汉': {
    avgSalary: 7496,
    minWage: 2400,
    severanceBase: '含加班费（湖北一档地区口径）',
    severanceConfidence: 'high',
    overtimeBase: '含加班费',
    notes: '湖北一档地区'
  },
  '西安': {
    avgSalary: 7750,
    minWage: 2376,
    severanceBase: '含加班费',
    severanceConfidence: 'high',
    overtimeBase: '含加班费',
    notes: '陕西一类地区'
  },
  '天津': {
    avgSalary: 8540,
    minWage: 2510,
    severanceBase: '含加班费',
    severanceConfidence: 'high',
    overtimeBase: '含加班费',
    notes: '经济补偿金包含加班费'
  },
};

// ====== 纠纷类型定义 ======
export type DisputeType =
  | 'illegal_termination'
  | 'forced_resignation'
  | 'wage_arrears'
  | 'overtime_pay'
  | 'no_contract'
  | 'social_insurance'
  | 'annual_leave'
  | 'probation_issue'
  | 'work_injury';

export interface DisputeTypeInfo {
  id: DisputeType;
  name: string;
  icon: string;
  description: string;
  commonCombo?: string[];
}

export const disputeTypes: DisputeTypeInfo[] = [
  {
    id: 'illegal_termination',
    name: '违法解除劳动合同',
    icon: 'AlertTriangle',
    description: '公司无正当理由辞退、未提前30天通知、辞退理由不成立',
    commonCombo: ['wage_arrears', 'social_insurance'],
  },
  {
    id: 'forced_resignation',
    name: '被迫离职（公司违法）',
    icon: 'LogOut',
    description: '公司欠薪、未缴社保、未提供劳动条件、规章制度违法',
    commonCombo: ['wage_arrears', 'social_insurance', 'overtime_pay'],
  },
  {
    id: 'wage_arrears',
    name: '拖欠/克扣工资',
    icon: 'DollarSign',
    description: '公司拖欠工资、克扣工资、未足额支付',
    commonCombo: ['forced_resignation', 'social_insurance'],
  },
  {
    id: 'overtime_pay',
    name: '加班费争议',
    icon: 'Clock',
    description: '公司未支付加班费、加班费计算基数争议',
    commonCombo: ['wage_arrears', 'illegal_termination'],
  },
  {
    id: 'no_contract',
    name: '未签劳动合同',
    icon: 'FileX',
    description: '入职超过1个月未签书面劳动合同',
    commonCombo: ['wage_arrears', 'social_insurance'],
  },
  {
    id: 'social_insurance',
    name: '社保/公积金争议',
    icon: 'Shield',
    description: '公司未缴/少缴社保或住房公积金',
    commonCombo: ['wage_arrears', 'forced_resignation'],
  },
  {
    id: 'annual_leave',
    name: '未休年休假',
    icon: 'Calendar',
    description: '公司未安排年休假或未支付年休假工资',
    commonCombo: ['illegal_termination'],
  },
  {
    id: 'probation_issue',
    name: '试用期争议',
    icon: 'UserCheck',
    description: '违法延长试用期、试用期工资低于标准、试用期无故辞退',
    commonCombo: ['illegal_termination'],
  },
  {
    id: 'work_injury',
    name: '工伤待遇争议',
    icon: 'HeartPulse',
    description: '工伤认定、停工留薪期、伤残待遇',
    commonCombo: [],
  },
];

// ====== 证据清单数据结构 ======
export interface EvidenceItem {
  name: string;
  description: string;
  importance: 'essential' | 'important' | 'helpful';
  howToGet: string;
  tips: string;
  legalBasis: string;
  fromType?: DisputeType;
}

export interface EvidenceCategory {
  category: string;
  items: EvidenceItem[];
}

export interface ProcessStep {
  title: string;
  description: string;
  documents?: string[];
  tips: string;
  duration?: string;
  lawRef?: string;
}

export interface TemplateDoc {
  title: string;
  content: string;
  downloadName: string;
}

// ====== 证据清单数据库（含14条律师反馈修复）======
export const evidenceDatabase: Record<DisputeType, EvidenceCategory[]> = {
  illegal_termination: [
    {
      category: '一、劳动关系证据',
      items: [
        {
          name: '劳动合同',
          description: '证明劳动关系存在、岗位、薪资标准、合同期限',
          importance: 'essential',
          howToGet: '入职时签订的那份；如果公司没给，可用工资流水+社保记录替代',
          tips: '如公司拒给，可在仲裁申请书中请求仲裁委责令公司提供',
          legalBasis: '《劳动合同法》第10条、第16条',
        },
        {
          name: '辞退通知书/解除通知',
          description: '公司出具的书面解除通知（必须盖章或法定代表人签字）',
          importance: 'essential',
          howToGet: '要求公司出具书面通知并盖章；如公司口头辞退，立即录音并要求书面确认',
          tips: '口头辞退 = 无效！必须书面。如公司拒出书面通知，继续正常上班打卡，保留考勤记录',
          legalBasis: '《劳动合同法》第39-41条',
        },
        {
          name: '工资发放记录',
          description: '银行流水、工资条，证明离职前12个月平均工资（经济补偿金基数）',
          importance: 'essential',
          howToGet: '银行APP导出PDF流水；工资条拍照保存',
          tips: '导出时标注"工资"字样；如现金发放，收集签收记录或证人证言',
          legalBasis: '《劳动合同法》第47条',
        },
        {
          name: '社保缴费记录',
          description: '证明劳动关系存续期间',
          importance: 'important',
          howToGet: '支付宝/微信搜索"社保查询"，或当地社保局官网打印',
          tips: '截图保存，打印时选择完整缴费月份',
          legalBasis: '《社会保险法》第58条',
        },
        {
          name: '工作年限证明',
          description: '入职通知、历年劳动合同、社保记录，证明N值',
          importance: 'important',
          howToGet: '最早入职时的通知邮件、合同、社保首月记录',
          tips: '2008年前入职需特别注意：2008年前后的计算规则不同',
          legalBasis: '《劳动合同法》第47条、第97条',
        },
        {
          name: '公司违法证据',
          description: '证明解除理由不成立的证据（考核记录、违纪认定材料等）',
          importance: 'important',
          howToGet: '公司声称的"违纪"是否有制度依据？制度是否经民主程序制定？是否公示？',
          tips: '公司负举证责任！如公司说你违纪，让公司拿出制度依据和民主程序记录',
          legalBasis: '《劳动合同法》第4条、第39条',
        },
        {
          name: '年终奖/绩效记录',
          description: '年终奖发放记录、绩效考核表',
          importance: 'helpful',
          howToGet: '年终奖银行流水、公司公示的绩效考核结果',
          tips: '各地对年终奖是否计入经济补偿金基数分歧很大：北京/深圳计入，上海按月分摊12个月计入，四川存在争议',
          legalBasis: '各地口径不同',
        },
      ],
    },
    {
      category: '二、赔偿金计算基础',
      items: [
        {
          name: '入职时间证明',
          description: '证明入职日期，用于计算工作年限N',
          importance: 'essential',
          howToGet: '最早劳动合同首页、入职通知邮件、社保首月缴费记录',
          tips: '入职通知书/offer邮件是最佳证据；2008年前入职需单独计算',
          legalBasis: '《劳动合同法》第47条',
        },
        {
          name: '离职前12个月平均工资',
          description: '经济补偿金基数 = 离职前12个月平均工资（含奖金、津贴）',
          importance: 'essential',
          howToGet: '银行APP导出最近12个月工资流水，手动加总÷12',
          tips: '注意：上海不含加班费；北京/深圳/杭州/南京/天津含加班费；四川不含加班费',
          legalBasis: '《劳动合同法》第47条',
        },
      ],
    },
  ],

  forced_resignation: [
    {
      category: '一、被迫离职情形证据（四选一即可，不必全部收集）',
      items: [
        {
          name: '情形A：公司未及时足额支付劳动报酬（欠薪）',
          description: '证明公司拖欠工资的事实',
          importance: 'essential',
          howToGet: '银行流水（显示应发未发月份）、工资条、催款记录',
          tips: '【重要】欠薪被迫离职要求公司存在"恶意拖欠"，不能是单纯经营困难导致的暂时延迟。需先发书面催告，给公司合理期限（通常7-15天）',
          legalBasis: '《劳动合同法》第38条第1款第（二）项',
        },
        {
          name: '情形B：公司未依法缴纳社会保险费',
          description: '证明公司未缴或少缴社保',
          importance: 'essential',
          howToGet: '社保局打印缴费记录，与公司应缴标准对比',
          tips: '【2025年9月新规】即使签了放弃社保协议，也可主张经济补偿（最高法司法解释二）。但2025年9月前的案件存在溯及力争议，建议同时主张',
          legalBasis: '《劳动合同法》第38条第1款第（三）项；最高法司法解释（二）2025年9月',
        },
        {
          name: '情形C：公司未提供劳动条件或规章制度违法',
          description: '公司擅自调岗降薪、不提供必要工作条件、规章制度损害劳动者权益',
          importance: 'essential',
          howToGet: '调岗通知、降薪通知、工作条件缺失的拍照/录像、规章制度文本',
          tips: '调岗需双方协商一致；单方降薪属未足额支付劳动报酬',
          legalBasis: '《劳动合同法》第38条第1款第（一）项、第（四）项',
        },
        {
          name: '情形D：公司强迫劳动或危及人身安全',
          description: '公司强迫劳动、违章指挥、强令冒险作业',
          importance: 'essential',
          howToGet: '报警记录、现场录像、同事证人证言',
          tips: '此情形可立即解除，无需催告',
          legalBasis: '《劳动合同法》第38条第2款',
        },
      ],
    },
    {
      category: '二、程序性要求（必须，与四选一无关）',
      items: [
        {
          name: '书面催告记录（情形A/B/C必备）',
          description: '向公司发出书面催告，要求限期改正',
          importance: 'essential',
          howToGet: 'EMS邮寄《催告函》（留存邮寄底单+签收记录）；或当面送达并要求签收',
          tips: '【关键步骤】必须先催告再给期限！直接发被迫离职通知可能被认定为"主动辞职"。催告内容需明确指出公司违法事实并要求限期改正',
          legalBasis: '《劳动合同法》第38条司法实践',
        },
        {
          name: '被迫解除劳动合同通知书',
          description: '向公司发出书面解除通知，说明解除理由',
          importance: 'essential',
          howToGet: 'EMS邮寄《被迫解除劳动合同通知书》，留存邮寄底单+签收记录',
          tips: '通知书模板要点：（1）明确依据《劳动合同法》第38条；（2）列明公司具体违法事实；（3）写明解除生效日期；（4）要求支付经济补偿金',
          legalBasis: '《劳动合同法》第38条',
        },
      ],
    },
    {
      category: '三、经济补偿计算基础',
      items: [
        {
          name: '工作年限证明',
          description: '入职通知、历年劳动合同、社保记录',
          importance: 'essential',
          howToGet: '入职时的offer邮件、合同首页、社保首月记录',
          tips: '被迫离职的经济补偿计算方式 = N（每满一年支付一个月工资）',
          legalBasis: '《劳动合同法》第46条、第47条',
        },
        {
          name: '离职前12个月平均工资',
          description: '银行流水、工资条',
          importance: 'essential',
          howToGet: '银行APP导出最近12个月工资流水',
          tips: '基数口径因城市而异',
          legalBasis: '《劳动合同法》第47条',
        },
      ],
    },
  ],

  wage_arrears: [
    {
      category: '一、劳动关系证据',
      items: [
        {
          name: '劳动合同',
          description: '证明劳动关系、岗位、薪资标准',
          importance: 'essential',
          howToGet: '入职时签订的合同；如无合同，用工资流水+社保记录替代',
          tips: '无合同反而有利：可主张未签劳动合同二倍工资（最多11个月）',
          legalBasis: '《劳动合同法》第10条',
        },
        {
          name: '工资标准约定证据',
          description: 'offer邮件、面试录音、薪资确认单',
          importance: 'essential',
          howToGet: '入职时的offer邮件/微信聊天记录、薪资确认单',
          tips: '如口头约定工资，需收集相关聊天记录、录音',
          legalBasis: '《劳动合同法》第30条',
        },
      ],
    },
    {
      category: '二、欠薪事实证据',
      items: [
        {
          name: '工资发放记录（银行流水）',
          description: '证明应发未发、克扣金额',
          importance: 'essential',
          howToGet: '银行APP导出PDF流水，标注工资到账记录',
          tips: '对比"应发工资"与"实发工资"，标注差额月份',
          legalBasis: '《劳动合同法》第30条',
        },
        {
          name: '工资条/工资明细',
          description: '公司每月提供的工资明细（纸质或电子）',
          importance: 'important',
          howToGet: '拍照/截图保存每月工资条；如公司不提供，在仲裁时要求公司提供',
          tips: '公司负举证责任（工资发放记录由公司保存）',
          legalBasis: '《工资支付暂行规定》第6条',
        },
        {
          name: '催讨工资记录',
          description: '向公司催讨工资的聊天记录、录音',
          importance: 'important',
          howToGet: '微信/钉钉催讨记录截图、电话录音',
          tips: '催讨话术模板："X总，我X年X月至X年X月的工资共计X元尚未支付，请于X月X日前支付，否则我将依法维权。"',
          legalBasis: '证明催告事实',
        },
        {
          name: '考勤记录',
          description: '证明实际出勤天数',
          importance: 'important',
          howToGet: '钉钉/企业微信导出、纸质考勤表拍照',
          tips: '公司负举证责任，但自己保存一份更稳妥',
          legalBasis: '《劳动争议调解仲裁法》第6条',
        },
        {
          name: '年终奖争议证据',
          description: '年终奖是否计入欠薪、经济补偿金基数',
          importance: 'helpful',
          howToGet: '年终奖发放记录、公司年终奖制度文件',
          tips: '各地对年终奖是否计入经济补偿金基数分歧很大：北京/深圳计入，上海分摊12月计入，四川存在争议',
          legalBasis: '各地口径不同',
        },
      ],
    },
  ],

  overtime_pay: [
    {
      category: '一、加班事实证据',
      items: [
        {
          name: '考勤记录',
          description: '证明实际加班时间（打卡记录、考勤表）',
          importance: 'essential',
          howToGet: '钉钉/企业微信导出打卡记录、纸质考勤表拍照',
          tips: '【关键】很多公司实行"综合工时制"或"不定时工时制"需经劳动行政部门审批，未经审批的无效，仍按标准工时制计算加班费',
          legalBasis: '《劳动法》第36条、第41条',
        },
        {
          name: '加班审批记录（如有）',
          description: 'OA系统加班申请审批记录',
          importance: 'important',
          howToGet: 'OA系统截图、加班申请单',
          tips: '【重要】很多公司没有加班审批制度。只要有实际安排了加班（领导口头指令、工作群通知、下班时间还在工作），即使未经审批也应认定加班事实',
          legalBasis: '《劳动法》第44条',
        },
        {
          name: '工作成果/工作群记录',
          description: '证明加班期间在工作',
          importance: 'important',
          howToGet: '工作群聊天记录（显示非工作时间还在沟通工作）、邮件发送时间截图、工作文件保存时间',
          tips: '截图要包含时间和内容：如"晚上10:15还在工作群回复消息"',
          legalBasis: '证明加班事实',
        },
        {
          name: '排班表/值班表',
          description: '公司安排的值班、轮班记录',
          importance: 'helpful',
          howToGet: '公司发布的排班表截图、值班通知',
          tips: '排班表直接证明公司安排了加班',
          legalBasis: '证明加班事实',
        },
      ],
    },
    {
      category: '二、工资标准证据',
      items: [
        {
          name: '劳动合同',
          description: '证明劳动关系、岗位、工资标准',
          importance: 'essential',
          howToGet: '入职时签订的合同',
          tips: '加班费计算基数 = 劳动合同约定的工资标准',
          legalBasis: '《劳动合同法》第10条',
        },
        {
          name: '工资条/银行流水',
          description: '证明正常工作时间工资标准',
          importance: 'essential',
          howToGet: '银行流水、工资条',
          tips: '加班费计算基数 = 正常工作时间工资（不含加班费本身）',
          legalBasis: '《劳动法》第44条',
        },
        {
          name: '加班工资已发放记录',
          description: '如公司已发部分加班费，证明基数',
          importance: 'important',
          howToGet: '工资条中加班费栏目',
          tips: '对比已发加班费与应发差额',
          legalBasis: '《劳动法》第44条',
        },
      ],
    },
  ],

  no_contract: [
    {
      category: '一、劳动关系证据',
      items: [
        {
          name: '实际工作证据',
          description: '证明事实劳动关系存在（入职时间、岗位、薪资）',
          importance: 'essential',
          howToGet: '入职通知邮件、工作证、工牌、门禁卡、考勤记录、工资流水',
          tips: '没有书面合同的情况下，以上证据组合可证明事实劳动关系',
          legalBasis: '《劳动合同法》第7条',
        },
        {
          name: '入职时间证据',
          description: '证明入职日期，用于计算二倍工资起止时间',
          importance: 'essential',
          howToGet: '入职offer邮件、首月工资流水、社保首月缴费记录',
          tips: '入职日期是二倍工资计算的起点',
          legalBasis: '《劳动合同法》第82条',
        },
        {
          name: '工资发放记录',
          description: '证明工资标准和发放情况',
          importance: 'essential',
          howToGet: '银行APP导出工资流水',
          tips: '二倍工资差额 = 应发工资 × 未签合同月份（最多11个月）',
          legalBasis: '《劳动合同法》第82条',
        },
        {
          name: '社保缴费记录',
          description: '证明劳动关系存续期间',
          importance: 'important',
          howToGet: '支付宝/微信社保查询',
          tips: '社保记录可佐证劳动关系存续期间',
          legalBasis: '《社会保险法》第58条',
        },
        {
          name: '同事证人证言',
          description: '在职同事证明你的工作事实',
          importance: 'helpful',
          howToGet: '请在职同事出具书面证言',
          tips: '证人需出庭作证，在职同事可能不便',
          legalBasis: '《民事诉讼法》第75条',
        },
      ],
    },
    {
      category: '二、公司拒绝签订合同证据（如有）',
      items: [
        {
          name: '公司拒绝签合同证据',
          description: '如公司拒绝签书面合同，劳动者可立即解除并主张补偿',
          importance: 'helpful',
          howToGet: '要求公司签合同的微信/邮件记录',
          tips: '如入职超过1个月公司仍拒签，可立即解除并主张经济补偿',
          legalBasis: '《劳动合同法实施条例》第6条',
        },
      ],
    },
  ],

  social_insurance: [
    {
      category: '一、实际工作证据',
      items: [
        {
          name: '劳动合同',
          description: '证明劳动关系',
          importance: 'essential',
          howToGet: '入职时签订的合同',
          tips: '全案由必备：劳动合同在所有劳动纠纷中都是核心证据',
          legalBasis: '《劳动合同法》第10条',
        },
        {
          name: '工资发放记录（银行流水）',
          description: '证明实际工资标准（社保缴费基数依据）',
          importance: 'essential',
          howToGet: '银行APP导出工资流水',
          tips: '社保补缴基数通常按实际工资计算',
          legalBasis: '《社会保险法》第12条',
        },
        {
          name: '社保缴费记录',
          description: '证明公司未缴或少缴',
          importance: 'essential',
          howToGet: '支付宝/微信搜索"社保查询"，或社保局打印',
          tips: '对比"应缴基数"（实际工资）与"实缴基数"',
          legalBasis: '《社会保险法》第58条',
        },
        {
          name: '公司拒绝缴纳社保证据（如有）',
          description: '如公司明确拒绝缴纳',
          importance: 'helpful',
          howToGet: '聊天记录、邮件',
          tips: '可结合被迫离职主张经济补偿',
          legalBasis: '《劳动合同法》第38条',
        },
      ],
    },
    {
      category: '二、特殊情形：放弃社保协议',
      items: [
        {
          name: '社保放弃协议（如有）',
          description: '如公司曾让你签放弃社保协议',
          importance: 'important',
          howToGet: '找出当时签的协议',
          tips: '【2025年9月新规】放弃社保协议无效！即使签了也可要求补缴社保并主张经济补偿（最高法司法解释二）。注意：如社保作为现金补偿发放，公司补缴后可能要求返还现金补偿',
          legalBasis: '最高法司法解释（二）2025年9月；《劳动合同法》第26条',
        },
      ],
    },
    {
      category: '三、地区受理差异提示',
      items: [
        {
          name: '仲裁委/社保中心受理路径',
          description: '不同地区社保争议受理机构不同',
          importance: 'important',
          howToGet: '咨询当地仲裁委或社保中心',
          tips: '【重要地区差异】上海：仲裁委不受理社保争议，需向社保中心投诉；北京/广州/深圳：仲裁委可受理社保争议；成都：可向仲裁委主张，也可向社保局投诉',
          legalBasis: '各地实践差异',
        },
      ],
    },
  ],

  annual_leave: [
    {
      category: '一、前提条件证据（必须先满足）',
      items: [
        {
          name: '连续工龄满12个月证明',
          description: '证明已连续工作满12个月（不限于同一公司，累计工龄连续即可）',
          importance: 'essential',
          howToGet: '社保缴费记录（显示连续12个月缴费）、前公司离职证明+入职时间证明',
          tips: '【关键】年休假的前提条件是"连续工作满12个月"——只要社保缴费记录连续12个月（不论是否换公司），即可享受年休假。很多人误以为必须在"本公司"满12个月',
          legalBasis: '《职工带薪年休假条例》第2条',
        },
        {
          name: '劳动合同',
          description: '证明当前劳动关系',
          importance: 'essential',
          howToGet: '入职时签订的合同',
          tips: '全案由必备',
          legalBasis: '《劳动合同法》第10条',
        },
      ],
    },
    {
      category: '二、年休假权益证据',
      items: [
        {
          name: '公司未安排年休假证据',
          description: '证明公司未安排休年假',
          importance: 'essential',
          howToGet: '公司休假制度文件、请假记录（显示无年休假选项）、工作群聊天记录',
          tips: '公司负举证责任：如公司说"已安排休假"，让公司拿出安排记录',
          legalBasis: '《职工带薪年休假条例》第5条',
        },
        {
          name: '未休年休假工资计算基数',
          description: '证明日工资标准（未休年假工资 = 日工资 × 300% × 未休天数）',
          importance: 'essential',
          howToGet: '离职前12个月平均工资 ÷ 21.75天',
          tips: '日工资 = 月平均工资 ÷ 21.75天；未休年假工资 = 日工资 × 未休天数 × 200%（其中100%已正常发放，额外追偿200%）',
          legalBasis: '《职工带薪年休假条例》第5条',
        },
        {
          name: '累计工龄证明（用于确定年休假天数）',
          description: '累计工龄决定年休假天数：1-10年5天，10-20年10天，20年以上15天',
          importance: 'important',
          howToGet: '社保缴费记录累计月份、前公司劳动合同',
          tips: '年休假天数按"累计工龄"计算，不是"本公司工龄"！',
          legalBasis: '《职工带薪年休假条例》第3条',
        },
      ],
    },
  ],

  probation_issue: [
    {
      category: '一、试用期违法证据',
      items: [
        {
          name: '劳动合同',
          description: '证明试用期约定',
          importance: 'essential',
          howToGet: '合同中的试用期条款',
          tips: '试用期长度法定上限：3个月≤合同期<1年 → 试用期≤1个月；1年≤合同期<3年 → 试用期≤2个月；合同期≥3年或无固定期 → 试用期≤6个月',
          legalBasis: '《劳动合同法》第19条',
        },
        {
          name: '试用期延长协议（如有）',
          description: '如公司要求延长试用期',
          importance: 'important',
          howToGet: '找出延长试用期协议',
          tips: '【重要】延长试用期必须双方协商一致，且延长后总试用期不能超过法定上限。上海允许协商延长但不能超期限；有些地方不允许延长',
          legalBasis: '《劳动合同法》第19条、第35条',
        },
        {
          name: '试用期工资发放记录',
          description: '证明试用期工资低于法定标准',
          importance: 'essential',
          howToGet: '工资流水',
          tips: '试用期工资不得低于本单位相同岗位最低档工资的80%或劳动合同约定工资的80%，且不得低于当地最低工资标准',
          legalBasis: '《劳动合同法》第20条',
        },
        {
          name: '试用期辞退理由证据',
          description: '公司试用期辞退必须证明"不符合录用条件"',
          importance: 'important',
          howToGet: '公司出具的辞退通知、考核记录',
          tips: '【关键】试用期辞退不是公司说了算！必须有"明确的录用条件"+"考核证明不符合"+"考核在试用期内作出"。三者缺一不可',
          legalBasis: '《劳动合同法》第39条第1项',
        },
      ],
    },
  ],

  work_injury: [
    {
      category: '一、工伤认定证据',
      items: [
        {
          name: '工伤认定决定书',
          description: '人社局出具的工伤认定书（确认工伤性质）',
          importance: 'essential',
          howToGet: '向人社局申请工伤认定（公司应在30日内申请，公司不申请则员工/家属可在1年内直接申请）',
          tips: '【第一步】必须先做工伤认定！没有认定书，后续所有待遇都无法主张',
          legalBasis: '《工伤保险条例》第17条、第20条',
        },
        {
          name: '劳动能力鉴定结论',
          description: '劳动能力鉴定委员会出具的伤残等级鉴定（1-10级）',
          importance: 'essential',
          howToGet: '工伤认定后，向劳动能力鉴定委员会申请鉴定',
          tips: '伤残等级直接决定待遇标准：1-4级保留劳动关系退出岗位；5-6级安排适当工作或按月领伤残津贴；7-10级劳动合同期满终止或解除时有一次性工伤医疗补助金和一次性伤残就业补助金',
          legalBasis: '《工伤保险条例》第21-37条',
        },
        {
          name: '事故经过证据（如尚未认定工伤则必须）',
          description: '证明事故发生的时间、地点、原因',
          importance: 'important',
          howToGet: '事故现场照片、同事证人证言、报警记录、120急救记录',
          tips: '【如已拿到工伤认定书，此项降级为important】认定工伤时人社局会调查，认定后无需重复提交',
          legalBasis: '《工伤保险条例》第18条',
        },
      ],
    },
    {
      category: '二、医疗/停工留薪期证据',
      items: [
        {
          name: '病假单/休假证明',
          description: '工伤医疗机构出具的病假单（用于计算停工留薪期）',
          importance: 'essential',
          howToGet: '工伤医疗机构（签订服务协议的医疗机构）出具',
          tips: '【关键】停工留薪期按工伤医疗机构出具的病假单计算。在浙江等地，停工留薪期直接按病假单累计计算；超过12个月需经劳动能力鉴定委员会确认',
          legalBasis: '《工伤保险条例》第33条',
        },
        {
          name: '诊断证明/病历',
          description: '医疗机构出具的诊断证明、病历记录',
          importance: 'important',
          howToGet: '医院病历本、诊断证明书',
          tips: '病假单比诊断证明更重要——病假单直接决定停工留薪期长度',
          legalBasis: '《工伤保险条例》第33条',
        },
        {
          name: '医疗费用票据',
          description: '工伤治疗期间的所有医疗费用发票',
          importance: 'important',
          howToGet: '医院收费票据',
          tips: '符合工伤保险诊疗项目目录、药品目录、住院服务标准的费用，从工伤保险基金支付',
          legalBasis: '《工伤保险条例》第30条',
        },
        {
          name: '停工留薪期工资发放记录',
          description: '证明停工留薪期工资是否足额发放',
          importance: 'important',
          howToGet: '工资流水',
          tips: '停工留薪期工资 = 原工资福利待遇不变，由单位按月支付。如单位未支付或不足额支付，可主张差额',
          legalBasis: '《工伤保险条例》第33条',
        },
      ],
    },
    {
      category: '三、伤残待遇计算参考',
      items: [
        {
          name: '伤残等级对应标准',
          description: '不同伤残等级对应不同待遇',
          importance: 'helpful',
          howToGet: '劳动能力鉴定结论',
          tips: '1-4级：保留劳动关系，退出岗位，按月领伤残津贴；5-6级：安排适当工作，难以安排的按月发伤残津贴（单位支付）；7-10级：合同期满终止或解除时，由工伤保险基金支付一次性工伤医疗补助金，由单位支付一次性伤残就业补助金',
          legalBasis: '《工伤保险条例》第35-37条',
        },
        {
          name: '本人工资证明',
          description: '工伤前12个月平均月缴费工资',
          importance: 'important',
          howToGet: '工资流水',
          tips: '本人工资高于社平工资300%的按300%计算，低于60%的按60%计算',
          legalBasis: '《工伤保险条例》第64条',
        },
      ],
    },
  ],
};

// ====== 赔偿金分段计算（2008年前后）======
export interface CompensationResult {
  totalCompensation: number;
  formula: string;
  explanation: string;
  warning: string;
  legalBasis: string;
  segments?: {
    pre2008: { years: number; amount: number; formula: string };
    post2008: { years: number; amount: number; formula: string };
    capped: boolean;
  };
}

export function calculateCompensation(
  type: DisputeType,
  city: string,
  years: number,
  salary: number,
  entryYear?: number,
  entryMonth?: number,
  overtimeHours?: { weekday: number; restDay: number; holiday: number },
): CompensationResult {
  const cityInfo = cityData[city];
  const avgSalary = cityInfo?.avgSalary || 10000;
  const cap = avgSalary * 3;

  // 工伤单独处理
  if (type === 'work_injury') {
    return {
      totalCompensation: 0,
      formula: '工伤待遇需根据伤残等级计算',
      explanation: '请先进行劳动能力鉴定，确定伤残等级后计算一次性伤残补助金、伤残津贴等。1-4级保留劳动关系；5-6级可安排工作或领伤残津贴；7-10级合同终止时有一次性工伤医疗补助金和伤残就业补助金。',
      warning: '工伤认定是第一步，必须在事故发生后30日内由单位申请，或1年内由员工/家属直接申请。',
      legalBasis: '《工伤保险条例》第17条、第35-37条',
    };
  }

  // 加班费单独处理
  if (type === 'overtime_pay' && overtimeHours) {
    const hourlyRate = salary / 21.75 / 8;
    const weekdayPay = overtimeHours.weekday * hourlyRate * 1.5;
    const restDayPay = overtimeHours.restDay * hourlyRate * 2;
    const holidayPay = overtimeHours.holiday * hourlyRate * 3;
    const total = Math.round((weekdayPay + restDayPay + holidayPay) * 100) / 100;
    return {
      totalCompensation: total,
      formula: `工作日延时：${overtimeHours.weekday}h × ¥${hourlyRate.toFixed(2)}/h × 1.5 + 休息日：${overtimeHours.restDay}h × ¥${hourlyRate.toFixed(2)}/h × 2 + 法定假日：${overtimeHours.holiday}h × ¥${hourlyRate.toFixed(2)}/h × 3`,
      explanation: `小时工资 = 月工资 ¥${salary} ÷ 21.75天 ÷ 8小时 = ¥${hourlyRate.toFixed(2)}/小时。工作日延时1.5倍、休息日2倍、法定假日3倍。`,
      warning: `加班费计算基数各地有差异：${cityInfo?.overtimeBase || '请咨询当地标准'}。部分城市（如上海）无约定时按正常出勤月工资的70%计算。`,
      legalBasis: '《劳动法》第44条',
    };
  }

  // 未签合同二倍工资
  if (type === 'no_contract') {
    const maxMonths = 11;
    const actualMonths = Math.min(years * 12, maxMonths);
    const total = Math.round(salary * actualMonths * 100) / 100;
    return {
      totalCompensation: total,
      formula: `月工资 ¥${salary} × 未签合同月份（最多11个月）`,
      explanation: `未签书面劳动合同的二倍工资差额 = 应发工资 × 未签合同月份。最多主张11个月（入职第2个月至第12个月）。超过1年未签视为已订立无固定期限劳动合同。`,
      warning: '【重要】各地对二倍工资仲裁时效计算方式不同：北京/上海按月拆分计算（每月单独计算1年时效）；广东/江苏等地存在争议。建议尽早申请仲裁！',
      legalBasis: '《劳动合同法》第82条、第14条',
    };
  }

  // 年休假工资
  if (type === 'annual_leave') {
    const dailyWage = salary / 21.75;
    const days = Math.min(years < 1 ? 0 : years < 10 ? 5 : years < 20 ? 10 : 15, 15);
    const total = Math.round(dailyWage * days * 200 * 100) / 100;
    return {
      totalCompensation: total,
      formula: `日工资(¥${dailyWage.toFixed(2)}) × 未休天数(${days}天) × 200%`,
      explanation: `年休假工资 = 日工资 × 未休天数 × 200%（其中100%已正常发放，额外追偿200%）。日工资 = 月工资 ÷ 21.75天。`,
      warning: '【前提条件】必须连续工作满12个月（不限于同一公司，累计工龄连续即可）。年休假天数按累计工龄计算：1-10年5天，10-20年10天，20年以上15天。',
      legalBasis: '《职工带薪年休假条例》第3条、第5条',
    };
  }

  // 社保/公积金补缴（非现金补偿）
  if (type === 'social_insurance') {
    return {
      totalCompensation: 0,
      formula: '补缴金额需根据社保局核算',
      explanation: '社保/公积金争议主要是补缴，不是直接支付赔偿金。可向社保中心投诉要求补缴，或在被迫离职时主张经济补偿。',
      warning: '【地区差异】上海仲裁委不受理社保争议，需向社保中心投诉；北京/深圳/广州仲裁委可受理。如已签放弃社保协议，2025年9月后协议无效，仍可主张补缴和经济补偿。',
      legalBasis: '《社会保险法》第63条、第86条；最高法司法解释（二）2025年9月',
    };
  }

  // 试用期违法
  if (type === 'probation_issue') {
    const total = Math.round(salary * 0.5 * 100) / 100;
    return {
      totalCompensation: total,
      formula: '试用期违法赔偿视具体情形',
      explanation: '试用期违法情形不同赔偿不同：违法延长试用期 = 按转正工资补差额；试用期工资低于标准 = 补足差额；违法辞退 = 赔偿金2N。',
      warning: '试用期辞退必须证明"不符合录用条件"，需同时满足：（1）有明确录用条件；（2）有考核证明不符合；（3）考核在试用期内作出。三者缺一不可！',
      legalBasis: '《劳动合同法》第19-21条、第39条第1项、第83条、第87条',
    };
  }

  // 标准经济补偿金/赔偿金计算（违法解除、被迫离职、欠薪）
  const isIllegalTermination = type === 'illegal_termination';
  const multiplier = isIllegalTermination ? 2 : 1; // 赔偿金2N，经济补偿金N
  const label = isIllegalTermination ? '赔偿金' : '经济补偿金';

  // 2008年前后分段计算
  const entryDate = entryYear && entryMonth ? new Date(entryYear, entryMonth - 1) : null;
  const cutoffDate = new Date(2008, 0, 1);
  const now = new Date();
  const totalMonths = entryDate
    ? (now.getFullYear() - entryDate.getFullYear()) * 12 + (now.getMonth() - entryDate.getMonth())
    : years * 12;
  const totalYears = Math.max(totalMonths / 12, years);

  let pre2008Years = 0;
  let post2008Years = 0;

  if (entryDate && entryDate < cutoffDate) {
    const preMonths = (cutoffDate.getFullYear() - entryDate.getFullYear()) * 12 + (cutoffDate.getMonth() - entryDate.getMonth());
    pre2008Years = Math.max(preMonths / 12, 0);
    post2008Years = Math.max(totalYears - pre2008Years, 0);
  } else {
    post2008Years = totalYears;
  }

  // 2008年前：基数无上限，年限12个月上限（仅适用于特定情形）
  const pre2008CappedYears = Math.min(pre2008Years, 12);
  const pre2008Amount = pre2008Years > 0 ? Math.round(salary * pre2008CappedYears * multiplier * 100) / 100 : 0;

  // 2008年后：基数有3倍社平工资上限（仅高薪时），年限12个月上限（仅高薪时）
  const isHighSalary = salary > cap;
  const post2008Base = isHighSalary ? cap : salary;
  const post2008CappedYears = isHighSalary ? Math.min(post2008Years, 12) : post2008Years;
  const post2008Amount = post2008Years > 0 ? Math.round(post2008Base * post2008CappedYears * multiplier * 100) / 100 : 0;

  const totalAmount = Math.round((pre2008Amount + post2008Amount) * 100) / 100;

  const hasSegments = pre2008Years > 0;

  let formula = '';
  let explanation = '';
  let warning = '';

  if (hasSegments) {
    formula = `${label} = (2008前: ¥${salary} × ${pre2008CappedYears.toFixed(1)}年 × ${multiplier}) + (2008后: ¥${post2008Base} × ${post2008CappedYears.toFixed(1)}年 × ${multiplier})`;
    explanation = `2008年前入职需分段计算：\n（1）2008年前段：基数无上限，年限上限12个月，适用${multiplier === 2 ? '赔偿金2N' : '经济补偿金N'}；\n（2）2008年后段：${isHighSalary ? `基数封顶为社平工资3倍(¥${cap})，年限封顶12个月` : '基数按实际工资，年限无上限'}。\n两段相加 = ¥${totalAmount}`;
    warning = `【重要】上海口径：赔偿金不能分段计算，直接按统一公式计算。其他地区可分段。2008年前段仅适用于协商解除、不能胜任、未提供劳动条件/未足额支付工资、强迫劳动等特定情形。经济补偿金基数口径：${cityInfo?.severanceBase || '请咨询当地标准'}`;
  } else {
    formula = `${label} = ¥${post2008Base} × ${post2008CappedYears.toFixed(1)}年 × ${multiplier}`;
    explanation = `${label} = ${isHighSalary ? '社平工资3倍封顶基数' : '离职前12个月平均工资'} × 工作年限 × ${multiplier}。${isHighSalary ? `您的工资(¥${salary})超过社平工资3倍(¥${cap})，基数封顶为¥${cap}，年限封顶12个月。` : ''}`;
    warning = `经济补偿金基数口径：${cityInfo?.severanceBase || '请咨询当地标准'}。各地对年终奖、加班费是否计入基数存在差异。`;
  }

  const result: CompensationResult = {
    totalCompensation: totalAmount,
    formula,
    explanation,
    warning,
    legalBasis: '《劳动合同法》第47条、第87条、第97条',
  };

  if (hasSegments) {
    result.segments = {
      pre2008: { years: pre2008CappedYears, amount: pre2008Amount, formula: `¥${salary} × ${pre2008CappedYears.toFixed(1)}年 × ${multiplier}` },
      post2008: { years: post2008CappedYears, amount: post2008Amount, formula: `¥${post2008Base} × ${post2008CappedYears.toFixed(1)}年 × ${multiplier}` },
      capped: isHighSalary,
    };
  }

  return result;
}

// ====== 仲裁流程 ======
export const arbitrationProcess: Record<DisputeType, ProcessStep[]> = {
  illegal_termination: [
    { title: '收集证据', description: '收集劳动合同、辞退通知、工资流水、工作年限证明等', documents: ['劳动合同', '辞退通知书', '工资流水', '社保记录'], tips: '辞退通知书必须书面盖章；口头辞退无效', duration: '1-2周', lawRef: '《劳动争议调解仲裁法》第6条' },
    { title: '确认管辖', description: '确定向哪个劳动仲裁委申请', documents: [], tips: '向劳动合同履行地或用人单位所在地的仲裁委申请', duration: '1天', lawRef: '《劳动争议调解仲裁法》第21条' },
    { title: '撰写申请书', description: '填写劳动仲裁申请书', documents: ['仲裁申请书'], tips: '明确请求事项、事实与理由、证据清单', duration: '2-3天', lawRef: '《劳动争议调解仲裁法》第28条' },
    { title: '提交申请', description: '向仲裁委提交申请书和证据材料', documents: ['仲裁申请书', '证据材料', '身份证明'], tips: '提交一式三份；保留受理回执', duration: '1天', lawRef: '《劳动争议调解仲裁法》第29条' },
    { title: '等待立案', description: '仲裁委5日内决定是否受理', documents: [], tips: '如不受理，可向法院起诉', duration: '5个工作日', lawRef: '《劳动争议调解仲裁法》第29条' },
    { title: '开庭审理', description: '举证质证、辩论', documents: ['证据原件'], tips: '公司负举证责任（辞退合法性）', duration: '1-2次庭审', lawRef: '《劳动争议调解仲裁法》第38条' },
    { title: '裁决', description: '仲裁委作出裁决', documents: ['仲裁裁决书'], tips: '一般45日内结案，复杂可延至60日', duration: '45-60日', lawRef: '《劳动争议调解仲裁法》第43条' },
    { title: '执行/起诉', description: '如不服裁决15日内向法院起诉；如公司不履行，申请强制执行', documents: ['裁决书', '强制执行申请书'], tips: '终局裁决（小额）公司不能起诉，只能申请撤销', duration: '视情况', lawRef: '《劳动争议调解仲裁法》第47-51条' },
  ],
  forced_resignation: [
    { title: '收集公司违法证据', description: '收集欠薪/未缴社保/未提供劳动条件等证据', documents: ['工资流水', '社保记录', '催告函'], tips: '必须先发书面催告，给公司合理期限（7-15天）改正', duration: '1-2周', lawRef: '《劳动合同法》第38条' },
    { title: '发送催告函', description: '书面催告公司限期改正违法行为', documents: ['催告函', '邮寄底单'], tips: 'EMS邮寄并保留签收记录；内容明确指出违法事实', duration: '7-15天等待期', lawRef: '司法实践' },
    { title: '发送被迫离职通知', description: '公司逾期未改正，发送被迫解除劳动合同通知', documents: ['被迫解除劳动合同通知书', '邮寄底单'], tips: '通知书需明确依据《劳动合同法》第38条，列明违法事实', duration: '1天', lawRef: '《劳动合同法》第38条' },
    { title: '确认管辖', description: '确定仲裁委', documents: [], tips: '同上', duration: '1天', lawRef: '《劳动争议调解仲裁法》第21条' },
    { title: '提交仲裁申请', description: '提交申请书和证据', documents: ['仲裁申请书', '证据材料'], tips: '请求事项：确认解除劳动关系 + 支付经济补偿金', duration: '1天', lawRef: '《劳动争议调解仲裁法》第28条' },
    { title: '开庭审理', description: '举证质证', documents: ['证据原件'], tips: '重点证明：公司违法事实 + 已履行催告程序', duration: '1-2次庭审', lawRef: '《劳动争议调解仲裁法》第38条' },
    { title: '裁决与执行', description: '仲裁委裁决', documents: ['裁决书'], tips: '被迫离职如成立，公司应支付经济补偿金N', duration: '45-60日', lawRef: '《劳动合同法》第46条、第47条' },
  ],
  wage_arrears: [
    { title: '收集欠薪证据', description: '银行流水、工资条、催讨记录', documents: ['工资流水', '工资条', '催讨记录'], tips: '对比应发与实发，标注差额', duration: '1周', lawRef: '《劳动合同法》第30条' },
    { title: '提交仲裁申请', description: '请求支付拖欠工资', documents: ['仲裁申请书', '证据材料'], tips: '可同时主张经济补偿金（如符合被迫离职条件）', duration: '1天', lawRef: '《劳动争议调解仲裁法》第28条' },
    { title: '裁决与执行', description: '仲裁委裁决公司支付欠薪', documents: ['裁决书'], tips: '如公司不履行，申请法院强制执行', duration: '45-60日', lawRef: '《劳动争议调解仲裁法》第43条' },
  ],
  overtime_pay: [
    { title: '收集加班证据', description: '考勤记录、工作群记录、加班审批', documents: ['考勤记录', '工作群截图', '加班审批'], tips: '未经审批但实际加班也有效', duration: '1-2周', lawRef: '《劳动法》第44条' },
    { title: '计算加班费差额', description: '按法定标准计算应发加班费', documents: ['计算明细'], tips: '工作日1.5倍、休息日2倍、法定假日3倍', duration: '1天', lawRef: '《劳动法》第44条' },
    { title: '提交仲裁申请', description: '请求支付加班费差额', documents: ['仲裁申请书', '证据材料'], tips: '注意仲裁时效！', duration: '1天', lawRef: '《劳动争议调解仲裁法》第28条' },
    { title: '裁决与执行', description: '仲裁委裁决', documents: ['裁决书'], tips: '部分地区仲裁时效1年，部分地区2年', duration: '45-60日', lawRef: '《劳动争议调解仲裁法》第43条' },
  ],
  no_contract: [
    { title: '收集劳动关系证据', description: '工资流水、社保记录、入职通知等', documents: ['工资流水', '社保记录', '入职通知'], tips: '证明事实劳动关系存在', duration: '1周', lawRef: '《劳动合同法》第7条' },
    { title: '计算二倍工资差额', description: '入职第2个月至第12个月的工资差额', documents: ['计算明细'], tips: '最多11个月；注意各地时效计算方式不同', duration: '1天', lawRef: '《劳动合同法》第82条' },
    { title: '提交仲裁申请', description: '请求支付未签劳动合同二倍工资差额', documents: ['仲裁申请书', '证据材料'], tips: '同时确认劳动关系存在', duration: '1天', lawRef: '《劳动争议调解仲裁法》第28条' },
    { title: '裁决与执行', description: '仲裁委裁决', documents: ['裁决书'], tips: '注意仲裁时效！北京/上海按月拆分计算', duration: '45-60日', lawRef: '《劳动争议调解仲裁法》第43条' },
  ],
  social_insurance: [
    { title: '收集社保缴费记录', description: '社保局打印缴费记录', documents: ['社保缴费记录'], tips: '对比应缴基数与实缴基数', duration: '3-5天', lawRef: '《社会保险法》第58条' },
    { title: '确定受理路径', description: '向仲裁委或社保中心投诉', documents: [], tips: '上海向社保中心投诉；其他地区可向仲裁委主张', duration: '1天', lawRef: '各地实践差异' },
    { title: '提交投诉/申请', description: '请求补缴社保/公积金', documents: ['投诉书/申请书', '证据材料'], tips: '如同时主张被迫离职经济补偿，需在仲裁申请中一并提出', duration: '1天', lawRef: '《社会保险法》第63条' },
    { title: '处理结果', description: '社保中心责令补缴或仲裁委裁决', documents: ['处理决定书/裁决书'], tips: '补缴金额由社保局核算', duration: '视情况', lawRef: '《社会保险法》第86条' },
  ],
  annual_leave: [
    { title: '确认年休假资格', description: '连续工作满12个月（不限于同一公司）', documents: ['社保缴费记录'], tips: '查看社保记录是否连续12个月', duration: '1天', lawRef: '《职工带薪年休假条例》第2条' },
    { title: '收集未休年假证据', description: '公司未安排年休假的证据', documents: ['请假记录', '公司制度'], tips: '公司负举证责任', duration: '3-5天', lawRef: '《职工带薪年休假条例》第5条' },
    { title: '计算未休年假工资', description: '日工资 × 未休天数 × 200%', documents: ['计算明细'], tips: '累计工龄决定年休假天数', duration: '1天', lawRef: '《职工带薪年休假条例》第5条' },
    { title: '提交仲裁申请', description: '请求支付未休年休假工资', documents: ['仲裁申请书', '证据材料'], tips: '注意仲裁时效', duration: '1天', lawRef: '《劳动争议调解仲裁法》第28条' },
  ],
  probation_issue: [
    { title: '收集试用期违法证据', description: '合同、延长协议、工资记录、辞退理由', documents: ['劳动合同', '延长协议', '工资流水', '辞退通知'], tips: '试用期辞退必须证明"不符合录用条件"', duration: '1周', lawRef: '《劳动合同法》第19-21条' },
    { title: '提交仲裁申请', description: '请求赔偿或恢复劳动关系', documents: ['仲裁申请书', '证据材料'], tips: '违法辞退可主张赔偿金2N或要求恢复劳动关系', duration: '1天', lawRef: '《劳动争议调解仲裁法》第28条' },
    { title: '裁决与执行', description: '仲裁委裁决', documents: ['裁决书'], tips: '试用期违法辞退赔偿金 = 2 × 试用期工资 × 工作年限', duration: '45-60日', lawRef: '《劳动合同法》第83条、第87条' },
  ],
  work_injury: [
    { title: '申请工伤认定', description: '向人社局申请工伤认定', documents: ['工伤认定申请表', '劳动关系证明', '医疗诊断证明'], tips: '公司应在30日内申请；公司不申请，员工/家属可在1年内直接申请', duration: '30-60日', lawRef: '《工伤保险条例》第17条' },
    { title: '申请劳动能力鉴定', description: '工伤认定后申请伤残等级鉴定', documents: ['劳动能力鉴定申请表', '工伤认定书', '病历材料'], tips: '鉴定结论直接影响待遇标准', duration: '60日', lawRef: '《工伤保险条例》第21-25条' },
    { title: '计算工伤待遇', description: '根据伤残等级计算各项待遇', documents: ['计算明细'], tips: '1-4级：保留劳动关系，退出岗位；5-6级：安排工作或领伤残津贴；7-10级：合同终止时有一次性工伤医疗补助金和伤残就业补助金', duration: '1天', lawRef: '《工伤保险条例》第35-37条' },
    { title: '申领待遇', description: '向社保经办机构申领工伤保险待遇', documents: ['工伤认定书', '鉴定结论', '身份证', '银行卡'], tips: '用人单位未参保的，由用人单位支付全部待遇', duration: '视情况', lawRef: '《工伤保险条例》第62条' },
  ],
};

// ====== 文书模板 ======
export const documentTemplates: TemplateDoc[] = [
  {
    title: '劳动仲裁申请书（通用模板）',
    downloadName: '劳动仲裁申请书',
    content: `申请人：[姓名]，性别：[性别]，民族：[民族]，出生日期：[日期]
身份证号：[身份证号]
住址：[住址]
联系电话：[电话]

被申请人：[公司名称]
统一社会信用代码：[代码]
住所地：[公司地址]
法定代表人：[姓名]，职务：[职务]
联系电话：[电话]

仲裁请求：
1. 请求确认申请人与被申请人之间的劳动关系于[日期]解除；
2. 请求裁决被申请人向申请人支付违法解除劳动合同赔偿金人民币[金额]元；
3. 请求裁决被申请人向申请人支付[其他请求事项]；
4. 请求裁决被申请人承担本案仲裁费用。

事实与理由：
申请人于[入职日期]入职被申请人公司，担任[岗位]，双方签订了劳动合同。
[描述公司违法行为的具体事实，时间、地点、经过]

根据《劳动合同法》第[条款]条之规定，[法律分析]

综上所述，被申请人的[行为]已严重侵害了申请人的合法权益。为维护申请人的合法权益，特向贵委申请仲裁，恳请依法裁决。

此致
[劳动人事争议仲裁委员会]

申请人：[签名]
日期：[日期]

附件：
1. 申请人身份证复印件
2. 劳动合同复印件
3. [其他证据材料清单]`,
  },
  {
    title: '被迫解除劳动合同通知书',
    downloadName: '被迫解除劳动合同通知书',
    content: `[公司名称]：

本人[姓名]，身份证号[身份证号]，于[入职日期]入职贵司，担任[岗位]。

因贵司存在以下违法情形，严重侵害本人合法权益：
1. [具体违法事实一，如：自[日期]起拖欠本人工资，共计[金额]元]；
2. [具体违法事实二，如：未依法为本人缴纳社会保险费]；
3. [其他违法事实]。

根据《中华人民共和国劳动合同法》第三十八条之规定，本人现正式通知贵司：

本人自本通知书送达之日起，解除与贵司的劳动合同关系。

请贵司于本通知书送达后[天数]日内：
1. 为本人办理离职手续，出具解除劳动合同证明；
2. 向本人支付解除劳动合同经济补偿金人民币[金额]元；
3. 结清本人全部工资及应报销费用；
4. 为本人办理社会保险和住房公积金转移手续。

如贵司逾期未办理，本人将依法通过法律途径维护自身合法权益，由此产生的一切法律后果由贵司承担。

特此通知。

通知人：[签名]
日期：[日期]`,
  },
  {
    title: '证据清单模板',
    downloadName: '证据清单',
    content: `证据清单

申请人：[姓名]
被申请人：[公司名称]
案由：[案由]

序号 | 证据名称 | 证明内容 | 页码
---|---|---|---
1 | 劳动合同 | 证明劳动关系存在、岗位、薪资标准 | 第1-5页
2 | 工资银行流水 | 证明工资发放情况及拖欠事实 | 第6-15页
3 | 社保缴费记录 | 证明公司未依法缴纳社保 | 第16-18页
4 | 辞退通知书 | 证明公司违法解除劳动关系 | 第19页
5 | 工作年限证明 | 证明入职时间及工作年限 | 第20-22页
6 | [其他证据] | [证明内容] | [页码]

提交人：[签名]
日期：[日期]`,
  },
];

export const cities = Object.keys(cityData);
