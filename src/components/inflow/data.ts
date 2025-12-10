import { CardData } from './types';

export const MOCK_DATA: CardData[] = [
  {
    id: 1,
    type: 'celebration',
    size: '2x2',
    title: "大客户签约: Acme Corp",
    summary: "ARR 增长 $50k。这是一个重要的里程碑，不仅是因为收入，更意味着我们在医疗领域的突破。这对我们 @Jason 的设计有参考价值。",
    meta: "刚刚 · 销售团队",
    details: "我们刚刚收到了 Acme Corp 的签约确认邮件。这笔交易历时 6 个月，由 Sarah 牵头。对方特别看重我们的数据合规性功能。接下来 CS 团队需要在一个月内完成部署，预计需要协调 3 名工程师。",
    tags: ["#Sales", "#Win", "#Milestone"],
    agent: {
      type: 'email-monitor',
      name: 'Sales Agent',
      displayName: 'Sales Agent',
      icon: 'Mail',
      color: 'bg-amber-100 text-amber-700',
      emoji: '💼'
    },
    category: 'business',
    sourcePlatform: 'gmail',
    sourceCount: 5,
    timeAgo: "刚刚",
    likes: 12,
    comments: 3,
    mentions: [
      { userId: 'jason', userName: 'Jason' }
    ],
    relatedDocs: [
      { id: 'prd-2024-v2', name: 'PRD-2024-V2', type: 'PRD' }
    ]
  },
  {
    id: 2,
    type: 'technical',
    size: '1x1',
    title: "延迟降低 30ms",
    summary: "后端架构迁移完成，核心 API 响应速度提升。",
    meta: "1小时前 · 基础设施",
    details: "经过昨晚的无停机迁移，我们将主数据库从 AWS 东区迁移到了更高性能的实例。P99 延迟从 120ms 降至 90ms，这将显著提升移动端用户的加载体验。",
    tags: ["#Eng", "#Performance"],
    agent: {
      type: 'github-monitor',
      name: 'Dev Sentinel',
      displayName: 'Dev Sentinel',
      icon: 'Code',
      color: 'bg-blue-100 text-blue-700',
      emoji: '⚙️'
    },
    category: 'product',
    sourcePlatform: 'github',
    sourceCount: 45,
    timeAgo: "1h ago",
    likes: 8,
    relatedDocs: [
      { id: 'perf-report-2024', name: 'Performance Report 2024', type: 'Report' }
    ]
  },
  {
    id: 4,
    type: 'intelligence',
    size: '1x2',
    title: "Linear 推出了新的 AI 过滤功能",
    summary: "根据官网更新，他们上线了智能任务分类功能，这对我们 @Jason 的设计有参考价值。",
    meta: "昨天 · 市场情报",
    details: "监控 Agent 发现竞品 X 的 Pricing 页面发生了结构性变化。他们去掉了 $29 的档位，新增了 'Contact Sales'。推测他们正在通过 PLG 转销售策略，我们需要重新评估 Q4 的定价策略以应对潜在的价格战。",
    tags: ["#Competitor", "#Strategy"],
    agent: {
      type: 'social-monitor',
      name: 'Market Watch',
      displayName: 'Market Watch',
      icon: 'MessageSquare',
      color: 'bg-purple-100 text-purple-700',
      emoji: '🔍'
    },
    category: 'competitor',
    sourcePlatform: 'twitter',
    sourceCount: 23,
    timeAgo: "2h ago",
    likes: 5,
    mentions: [
      { userId: 'jason', userName: 'Jason' }
    ],
    relatedDocs: [
      { id: 'competitor-analysis-q4', name: 'Competitor Analysis Q4', type: 'Analysis' }
    ]
  },
  {
    id: 3,
    type: 'voice',
    size: '2x1',
    title: '"这简直是魔法！"',
    summary: "用户 @jason_design 在 Twitter 上盛赞 AI 抠图功能。",
    meta: "2小时前 · 社交媒体",
    details: "Jason 是知名的设计类 KOL，他的这条推文已经获得了 400+ 转推。运营团队建议我们在 2 小时内跟进互动，送出一年的 Pro 账号，并邀请他参与下个版本的内测。",
    tags: ["#Feedback", "#Viral"],
    agent: {
      type: 'social-monitor',
      name: 'Market Watch',
      displayName: 'Market Watch',
      icon: 'MessageSquare',
      color: 'bg-purple-100 text-purple-700',
      emoji: '🔍'
    },
    category: 'business',
    sourcePlatform: 'twitter',
    sourceCount: 12,
    timeAgo: "2h ago",
    likes: 24,
    comments: 7,
    mentions: [
      { userId: 'jason_design', userName: 'jason_design' }
    ]
  },
  {
    id: 6,
    type: 'celebration',
    size: '1x1',
    title: "新成员入职",
    summary: "欢迎 Alex 加入前端团队！",
    meta: "4小时前 · HR",
    details: "Alex 之前在 Figma 工作，擅长 WebGL 和交互设计。他将负责 Inflow 下一代仪表盘的视觉重构工作。",
    tags: ["#Team", "#Onboarding"],
    agent: {
      type: 'human-post',
      name: 'Sarah Chen',
      icon: 'User',
      color: 'bg-stone-100 text-stone-700',
      authorName: 'Sarah Chen',
      avatarFallback: 'SC'
    },
    category: 'business',
    sourcePlatform: 'slack',
    timeAgo: "4h ago",
    likes: 15
  },
  {
    id: 7,
    type: 'intelligence',
    size: '2x1',
    title: "趋势：AI 法规",
    summary: "欧盟刚刚通过了新的 AI 数据草案。",
    meta: "5小时前 · 法务",
    details: "详细的法律解读文档已上传至 Notion。简而言之，我们需要在下个版本中增加显式的用户数据训练许可弹窗，否则可能面临高达营收 4% 的罚款风险。",
    tags: ["#Legal", "#EU"],
    agent: {
      type: 'human-post',
      name: 'Legal Team',
      icon: 'User',
      color: 'bg-stone-100 text-stone-700',
      authorName: 'Legal Team',
      avatarFallback: 'LT'
    },
    category: 'business',
    sourcePlatform: 'notion',
    sourceCount: 3,
    timeAgo: "5h ago",
    likes: 3,
    comments: 1,
    relatedDocs: [
      { id: 'eu-ai-regulation-2024', name: 'EU AI Regulation 2024', type: 'Legal' }
    ]
  },
  {
    id: 5,
    type: 'technical',
    size: '1x1',
    title: "Bug #402 修复",
    summary: "OAuth 回调问题已解决。",
    meta: "3小时前 · 研发",
    details: "这是一个影响 5% 欧洲用户的边缘案例，主要是由于时区处理不当导致的 Token 失效。修复代码已部署到 Prod 环境。",
    tags: ["#Fix", "#Auth"],
    agent: {
      type: 'github-monitor',
      name: 'Dev Sentinel',
      displayName: 'Dev Sentinel',
      icon: 'Code',
      color: 'bg-blue-100 text-blue-700',
      emoji: '⚙️'
    },
    category: 'product',
    sourcePlatform: 'github',
    sourceCount: 8,
    timeAgo: "3h ago",
    likes: 6,
    relatedDocs: [
      { id: 'bug-402', name: 'Bug #402', type: 'Issue' }
    ]
  }
];
