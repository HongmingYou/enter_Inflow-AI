import { Zap, Quote, Eye, Terminal, Activity, Code, MessageSquare, Mail, User } from 'lucide-react';
import { AgentType, AgentInfo } from './types';

// Agent 默认头像（emoji）
export const getAgentAvatar = (agent: AgentInfo): { emoji?: string; fallback: string } => {
  // 如果有自定义头像，返回它
  if (agent.avatar) {
    return { emoji: agent.avatar, fallback: agent.avatarFallback || agent.name.charAt(0) };
  }
  
  // 根据 Agent 类型返回默认头像
  switch (agent.type) {
    case 'github-monitor':
      return { emoji: '🤖', fallback: 'GM' }; // GitHub Monitor
    case 'social-monitor':
      return { emoji: '👁️', fallback: 'SM' }; // Social Monitor
    case 'email-monitor':
      return { emoji: '📧', fallback: 'EM' }; // Email Monitor
    case 'human-post':
      // 人工发布使用首字母
      const name = agent.authorName || agent.name;
      return { fallback: name.charAt(0).toUpperCase() };
    default:
      return { emoji: '🤖', fallback: 'A' };
  }
};

// Agent icon mapping - 数字员工的图标
export const getAgentIcon = (agentType: AgentType, size = 14) => {
  const iconProps = { size, className: 'text-current' };
  switch (agentType) {
    case 'github-monitor':
      return <Code {...iconProps} />; // 代码图标，代表 GitHub 监控
    case 'social-monitor':
      return <MessageSquare {...iconProps} />; // 消息图标，代表社媒监控
    case 'email-monitor':
      return <Mail {...iconProps} />; // 邮件图标，代表邮箱监控
    case 'human-post':
      return <User {...iconProps} />; // 用户图标，代表人工发布
    default:
      return <Activity {...iconProps} />;
  }
};

// Agent color mapping for pill backgrounds
export const getAgentColor = (agentType: AgentType): string => {
  switch (agentType) {
    case 'github-monitor':
      return 'bg-blue-100 text-blue-700'; // 蓝色 - 技术/代码相关
    case 'social-monitor':
      return 'bg-purple-100 text-purple-700'; // 紫色 - 社媒/社区相关
    case 'email-monitor':
      return 'bg-amber-100 text-amber-700'; // 琥珀色 - 邮件/支持相关
    case 'human-post':
      return 'bg-stone-100 text-stone-700'; // 灰色 - 人工发布
    default:
      return 'bg-stone-100 text-stone-700';
  }
};

// Original card type icons (kept for backward compatibility)
export const getIcon = (type: string, size = 18) => {
  const colorClass = type === 'voice' ? 'text-foreground' : 'text-stone-700';
  switch (type) {
    case 'celebration':
      return <Zap size={size} className={colorClass} />;
    case 'technical':
      return <Terminal size={size} className={colorClass} />;
    case 'voice':
      return <Quote size={size} className={colorClass} />;
    case 'intelligence':
      return <Eye size={size} className={colorClass} />;
    default:
      return <Activity size={size} className={colorClass} />;
  }
};
