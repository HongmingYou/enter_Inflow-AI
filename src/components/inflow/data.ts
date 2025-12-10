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
  },
  {
    id: 8,
    type: 'celebration',
    size: '1x2',
    title: "月活跃用户突破 10 万",
    summary: "MAU 达到 100,234，环比增长 23%。",
    meta: "6小时前 · 产品数据",
    details: "这是自产品上线以来的重要里程碑。增长主要来自移动端的推广活动，其中 iOS 端贡献了 65% 的新用户。下一步需要关注留存率，目前 7 日留存为 68%，还有提升空间。",
    tags: ["#Growth", "#Milestone", "#Metrics"],
    agent: {
      type: 'github-monitor',
      name: 'Analytics Bot',
      displayName: 'Analytics Bot',
      icon: 'BarChart',
      color: 'bg-green-100 text-green-700',
      emoji: '📊'
    },
    category: 'product',
    sourcePlatform: 'linear',
    sourceCount: 156,
    timeAgo: "6h ago",
    likes: 42,
    comments: 8,
    relatedDocs: [
      { id: 'growth-report-q4', name: 'Growth Report Q4', type: 'Report' }
    ]
  },
  {
    id: 9,
    type: 'voice',
    size: '1x1',
    title: '"希望支持深色模式"',
    summary: "用户反馈最多的功能请求。",
    meta: "7小时前 · 用户反馈",
    details: "过去一周收到了 127 条关于深色模式的请求，主要集中在移动端。设计团队已经完成了初步方案，预计下个 sprint 可以开始开发。",
    tags: ["#Feature", "#UX", "#Mobile"],
    agent: {
      type: 'email-monitor',
      name: 'Feedback Collector',
      displayName: 'Feedback Collector',
      icon: 'Mail',
      color: 'bg-amber-100 text-amber-700',
      emoji: '💬'
    },
    category: 'product',
    sourcePlatform: 'gmail',
    sourceCount: 127,
    timeAgo: "7h ago",
    likes: 18,
    comments: 5
  },
  {
    id: 10,
    type: 'technical',
    size: '2x1',
    title: "GraphQL API v2 发布",
    summary: "新版本支持实时订阅和批量查询。",
    meta: "8小时前 · 后端",
    details: "经过 3 个月的开发，GraphQL API v2 正式上线。主要改进包括：支持 WebSocket 实时订阅、批量查询减少请求次数、更完善的错误处理。迁移指南已发布在文档中心。",
    tags: ["#API", "#Release", "#Backend"],
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
    sourceCount: 34,
    timeAgo: "8h ago",
    likes: 15,
    comments: 4,
    relatedDocs: [
      { id: 'graphql-v2-migration', name: 'GraphQL v2 Migration Guide', type: 'Doc' }
    ]
  },
  {
    id: 11,
    type: 'intelligence',
    size: '1x1',
    title: "Notion AI 价格调整",
    summary: "竞品将 AI 功能从 $10 降至 $8。",
    meta: "9小时前 · 市场情报",
    details: "Notion 宣布将 AI 功能价格下调 20%，这可能影响我们的定价策略。建议产品团队在下周会议上讨论应对方案。",
    tags: ["#Competitor", "#Pricing"],
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
    sourceCount: 18,
    timeAgo: "9h ago",
    likes: 7,
    relatedDocs: [
      { id: 'pricing-strategy-2024', name: 'Pricing Strategy 2024', type: 'Strategy' }
    ]
  },
  {
    id: 12,
    type: 'celebration',
    size: '2x2',
    title: "年度最佳 SaaS 产品奖",
    summary: "我们获得了 Product Hunt 2024 年度最佳 SaaS 产品！",
    meta: "10小时前 · 品牌",
    details: "这是团队共同努力的结果！特别感谢产品、设计和工程团队的出色工作。这个奖项将帮助我们获得更多媒体曝光和潜在客户。市场团队正在准备新闻稿和社交媒体宣传。",
    tags: ["#Award", "#Recognition", "#Team"],
    agent: {
      type: 'human-post',
      name: 'Marketing Team',
      icon: 'User',
      color: 'bg-stone-100 text-stone-700',
      authorName: 'Marketing Team',
      avatarFallback: 'MT'
    },
    category: 'business',
    sourcePlatform: 'slack',
    timeAgo: "10h ago",
    likes: 89,
    comments: 23,
    mentions: [
      { userId: 'jason', userName: 'Jason' }
    ]
  },
  {
    id: 13,
    type: 'technical',
    size: '1x1',
    title: "CDN 优化完成",
    summary: "图片加载速度提升 40%。",
    meta: "11小时前 · 基础设施",
    details: "通过切换到 Cloudflare 的全球 CDN 网络，静态资源加载时间从平均 1.2s 降至 0.7s。这显著改善了移动端用户的体验，特别是在网络较慢的地区。",
    tags: ["#Performance", "#CDN", "#Infrastructure"],
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
    sourceCount: 12,
    timeAgo: "11h ago",
    likes: 9
  },
  {
    id: 14,
    type: 'voice',
    size: '2x1',
    title: '"这个功能拯救了我的工作流程"',
    summary: "企业客户 TechCorp 的 CTO 在 LinkedIn 上分享使用体验。",
    meta: "12小时前 · 社交媒体",
    details: "TechCorp 的 CTO 发布了一篇详细的 LinkedIn 文章，分享了他们如何使用我们的自动化功能节省了每周 15 小时的工作时间。这篇文章已经获得了 500+ 点赞，是很好的客户案例素材。",
    tags: ["#Testimonial", "#CaseStudy", "#Enterprise"],
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
    sourceCount: 5,
    timeAgo: "12h ago",
    likes: 31,
    comments: 6
  },
  {
    id: 15,
    type: 'intelligence',
    size: '1x2',
    title: "Figma 插件生态报告",
    summary: "2024 年 Figma 插件下载量增长 300%。",
    meta: "13小时前 · 市场研究",
    details: "根据最新的市场研究报告，Figma 插件市场正在快速增长。我们目前有 3 个 Figma 插件在开发中，预计下个季度发布。这可能是新的增长点。",
    tags: ["#Market", "#Figma", "#Opportunity"],
    agent: {
      type: 'human-post',
      name: 'Research Team',
      icon: 'User',
      color: 'bg-stone-100 text-stone-700',
      authorName: 'Research Team',
      avatarFallback: 'RT'
    },
    category: 'competitor',
    sourcePlatform: 'notion',
    sourceCount: 7,
    timeAgo: "13h ago",
    likes: 4,
    relatedDocs: [
      { id: 'figma-plugin-strategy', name: 'Figma Plugin Strategy', type: 'Strategy' }
    ]
  },
  {
    id: 16,
    type: 'celebration',
    size: '1x1',
    title: "连续 30 天零宕机",
    summary: "系统稳定性达到新高度！",
    meta: "14小时前 · 运维",
    details: "我们实现了连续 30 天 100% 可用性，这是自产品上线以来的最佳记录。这得益于新的监控系统和自动恢复机制。",
    tags: ["#Reliability", "#SRE", "#Infrastructure"],
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
    sourceCount: 1,
    timeAgo: "14h ago",
    likes: 12
  },
  {
    id: 17,
    type: 'technical',
    size: '1x1',
    title: "TypeScript 迁移完成",
    summary: "所有核心模块已迁移到 TypeScript。",
    meta: "15小时前 · 前端",
    details: "经过 6 个月的努力，我们将所有核心前端代码从 JavaScript 迁移到了 TypeScript。这显著提升了代码质量和开发效率，类型错误减少了 80%。",
    tags: ["#TypeScript", "#Refactor", "#Frontend"],
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
    sourceCount: 67,
    timeAgo: "15h ago",
    likes: 21,
    comments: 3
  },
  {
    id: 18,
    type: 'voice',
    size: '1x1',
    title: '"移动端体验需要改进"',
    summary: "用户满意度调研结果。",
    meta: "16小时前 · 用户研究",
    details: "最新的用户满意度调研显示，移动端体验得分仅为 6.8/10，低于桌面端的 8.5/10。主要问题集中在导航复杂和加载速度慢。产品团队已将此列为 Q1 重点改进项。",
    tags: ["#UX", "#Mobile", "#Feedback"],
    agent: {
      type: 'email-monitor',
      name: 'Feedback Collector',
      displayName: 'Feedback Collector',
      icon: 'Mail',
      color: 'bg-amber-100 text-amber-700',
      emoji: '💬'
    },
    category: 'product',
    sourcePlatform: 'gmail',
    sourceCount: 89,
    timeAgo: "16h ago",
    likes: 6,
    comments: 2
  },
  {
    id: 19,
    type: 'intelligence',
    size: '2x1',
    title: "OpenAI 发布 GPT-5 预览",
    summary: "新模型在代码生成任务上提升 50%。",
    meta: "17小时前 · 技术趋势",
    details: "OpenAI 发布了 GPT-5 的预览版本，在代码生成、数学推理和创意写作方面都有显著提升。我们的 AI 功能团队正在评估如何集成新模型，预计可以提升 30% 的响应质量。",
    tags: ["#AI", "#GPT", "#Technology"],
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
    sourceCount: 234,
    timeAgo: "17h ago",
    likes: 28,
    comments: 9,
    relatedDocs: [
      { id: 'gpt5-integration-plan', name: 'GPT-5 Integration Plan', type: 'Plan' }
    ]
  },
  {
    id: 20,
    type: 'celebration',
    size: '1x2',
    title: "客户续约率 95%",
    summary: "年度客户续约率创历史新高！",
    meta: "18小时前 · 客户成功",
    details: "本年度客户续约率达到 95%，比去年提升了 8 个百分点。这主要归功于客户成功团队的精细化运营和产品价值的持续提升。",
    tags: ["#Retention", "#CS", "#Success"],
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
    sourceCount: 45,
    timeAgo: "18h ago",
    likes: 35,
    comments: 7
  },
  {
    id: 21,
    type: 'technical',
    size: '1x1',
    title: "数据库查询优化",
    summary: "复杂查询性能提升 60%。",
    meta: "19小时前 · 后端",
    details: "通过添加索引和优化查询语句，我们将最复杂的报表查询时间从 3.2s 降至 1.3s。这显著改善了用户在使用数据分析功能时的体验。",
    tags: ["#Database", "#Performance", "#Backend"],
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
    sourceCount: 23,
    timeAgo: "19h ago",
    likes: 11
  },
  {
    id: 22,
    type: 'voice',
    size: '1x1',
    title: '"希望有更多模板"',
    summary: "设计师用户反馈。",
    meta: "20小时前 · 用户反馈",
    details: "设计师用户群体反馈希望增加更多预设模板，特别是针对不同行业的模板。设计团队已开始收集需求，计划在下个版本中增加 20+ 新模板。",
    tags: ["#Templates", "#Design", "#Feature"],
    agent: {
      type: 'email-monitor',
      name: 'Feedback Collector',
      displayName: 'Feedback Collector',
      icon: 'Mail',
      color: 'bg-amber-100 text-amber-700',
      emoji: '💬'
    },
    category: 'product',
    sourcePlatform: 'gmail',
    sourceCount: 56,
    timeAgo: "20h ago",
    likes: 14,
    comments: 4
  },
  {
    id: 23,
    type: 'intelligence',
    size: '1x1',
    title: "Slack 集成 API 更新",
    summary: "竞品发布了新的集成能力。",
    meta: "21小时前 · 市场情报",
    details: "Slack 发布了新的 Workflow Builder API，允许更深度的工作流集成。我们的集成团队正在评估是否需要更新我们的 Slack 集成以保持竞争力。",
    tags: ["#Integration", "#Slack", "#Competitor"],
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
    sourceCount: 15,
    timeAgo: "21h ago",
    likes: 5
  },
  {
    id: 24,
    type: 'celebration',
    size: '2x1',
    title: "团队 Hackathon 获胜项目",
    summary: "AI 代码审查助手获得最佳创新奖！",
    meta: "22小时前 · 团队活动",
    details: "在刚刚结束的内部 Hackathon 中，由 3 名工程师组成的团队开发的 AI 代码审查助手获得了最佳创新奖。这个工具可以自动检测代码中的潜在问题，预计可以节省 40% 的代码审查时间。产品团队正在评估是否将其集成到主产品中。",
    tags: ["#Hackathon", "#Innovation", "#AI"],
    agent: {
      type: 'human-post',
      name: 'Engineering Team',
      icon: 'User',
      color: 'bg-stone-100 text-stone-700',
      authorName: 'Engineering Team',
      avatarFallback: 'ET'
    },
    category: 'product',
    sourcePlatform: 'slack',
    timeAgo: "22h ago",
    likes: 47,
    comments: 12
  },
  {
    id: 25,
    type: 'technical',
    size: '1x2',
    title: "安全审计通过",
    summary: "SOC 2 Type II 认证更新完成。",
    meta: "23小时前 · 安全",
    details: "我们成功通过了年度 SOC 2 Type II 安全审计，所有安全控制措施都符合标准。这对于维护企业客户的信任至关重要，特别是金融和医疗行业的客户。",
    tags: ["#Security", "#Compliance", "#Enterprise"],
    agent: {
      type: 'human-post',
      name: 'Security Team',
      icon: 'User',
      color: 'bg-stone-100 text-stone-700',
      authorName: 'Security Team',
      avatarFallback: 'ST'
    },
    category: 'business',
    sourcePlatform: 'notion',
    sourceCount: 2,
    timeAgo: "23h ago",
    likes: 19,
    comments: 3,
    relatedDocs: [
      { id: 'soc2-audit-2024', name: 'SOC 2 Audit 2024', type: 'Report' }
    ]
  },
  {
    id: 26,
    type: 'voice',
    size: '2x1',
    title: '"这个新功能太棒了！"',
    summary: "Beta 测试用户对 AI 助手的评价。",
    meta: "昨天 · Beta 测试",
    details: '我们向 500 名 Beta 测试用户发布了新的 AI 助手功能，收到了大量正面反馈。87% 的用户表示这个功能“非常有价值”，平均使用时长增加了 35%。正式版本计划在下个月发布。',
    tags: ["#Beta", "#AI", "#Feature"],
    agent: {
      type: 'email-monitor',
      name: 'Feedback Collector',
      displayName: 'Feedback Collector',
      icon: 'Mail',
      color: 'bg-amber-100 text-amber-700',
      emoji: '💬'
    },
    category: 'product',
    sourcePlatform: 'gmail',
    sourceCount: 342,
    timeAgo: "1d ago",
    likes: 52,
    comments: 15
  },
  {
    id: 27,
    type: 'intelligence',
    size: '1x1',
    title: "Jira 自动化功能增强",
    summary: "竞品推出了新的自动化规则引擎。",
    meta: "昨天 · 市场情报",
    details: "Jira 发布了新的自动化规则引擎，支持更复杂的条件逻辑和自定义脚本。我们的项目管理功能团队正在研究如何提升我们的自动化能力以保持竞争力。",
    tags: ["#Automation", "#Jira", "#Competitor"],
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
    sourceCount: 28,
    timeAgo: "1d ago",
    likes: 6
  },
  {
    id: 28,
    type: 'celebration',
    size: '1x1',
    title: "开源项目 10k Stars",
    summary: "我们的开源 SDK 达到 10,000 GitHub Stars！",
    meta: "昨天 · 开源",
    details: "我们的 JavaScript SDK 在 GitHub 上达到了 10,000 Stars 的里程碑！这证明了开发者社区对我们产品的认可。开源团队计划在下个月发布 v3.0 版本。",
    tags: ["#OpenSource", "#Community", "#SDK"],
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
    sourceCount: 1,
    timeAgo: "1d ago",
    likes: 73,
    comments: 18
  },
  {
    id: 29,
    type: 'technical',
    size: '1x1',
    title: "微服务架构优化",
    summary: "服务间通信延迟降低 25%。",
    meta: "昨天 · 架构",
    details: "通过引入 gRPC 和优化服务发现机制，我们将微服务间的通信延迟降低了 25%。这提升了整体系统的响应速度，特别是在高并发场景下。",
    tags: ["#Architecture", "#Microservices", "#Performance"],
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
    sourceCount: 19,
    timeAgo: "1d ago",
    likes: 13,
    comments: 2
  },
  {
    id: 30,
    type: 'voice',
    size: '2x2',
    title: '"这是我用过最好的协作工具"',
    summary: "企业客户 GlobalTech 的 CEO 在行业会议上推荐。",
    meta: "2天前 · 客户案例",
    details: "GlobalTech 的 CEO 在 TechCrunch Disrupt 大会上公开推荐了我们的产品，分享了他们如何使用我们的平台提升了 50% 的团队协作效率。这个推荐已经带来了 20+ 个潜在客户咨询，销售团队正在跟进。",
    tags: ["#Testimonial", "#Enterprise", "#Growth"],
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
    sourceCount: 8,
    timeAgo: "2d ago",
    likes: 96,
    comments: 24,
    mentions: [
      { userId: 'jason', userName: 'Jason' }
    ],
    relatedDocs: [
      { id: 'globaltech-case-study', name: 'GlobalTech Case Study', type: 'CaseStudy' }
    ]
  }
];
