// 4种 Agent 类型
export type AgentType = 'github-monitor' | 'social-monitor' | 'email-monitor' | 'human-post';

export interface AgentInfo {
  type: AgentType;
  name: string; // Agent 名称，如 "GitHub Monitor" 或人名
  icon: string; // Icon name for lucide-react
  color: string; // Tailwind color class for pill background
  authorName?: string; // 如果是人工发布，显示发布者名字
  avatar?: string; // 头像 URL 或 emoji
  avatarFallback?: string; // 头像 fallback 文字（用于显示首字母）
}

export interface Mention {
  userId: string;
  userName: string;
  position?: { start: number; end: number }; // For highlighting in text
}

export type ReactionType = '👍' | '❤️' | '😂' | '🎉' | '🔥' | '💡' | '👏' | '🚀';

export interface Reaction {
  id: string;
  type: ReactionType;
  userId: string;
  userName: string;
  timestamp: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  content: string;
  timestamp: Date;
  reactions?: Reaction[];
}

export interface CardData {
  id: number;
  type: 'celebration' | 'technical' | 'voice' | 'intelligence';
  size: '1x1' | '2x1' | '1x2' | '2x2';
  title: string;
  summary: string;
  meta: string;
  details: string;
  tags: string[];
  // Agent information
  agent: AgentInfo;
  // Mentions - users mentioned in this card
  mentions?: Mention[];
  // Time information
  timeAgo: string; // e.g., "2h ago"
  timestamp?: Date;
  // Interaction data
  likes?: number;
  comments?: number;
  reactions?: Reaction[]; // All reactions on this card
  commentsList?: Comment[]; // All comments on this card
  // Related documents
  relatedDocs?: Array<{ id: string; name: string; type: string }>;
}
