import type { LucideIcon } from 'lucide-react';

export interface AgentCard {
  id: string;
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  avatar?: string;
  category: 'monitoring' | 'analysis' | 'automation';
  status: 'active' | 'available' | 'coming-soon';
  capabilities: string[];
  skills: string[];
  permissions: string[];
  teamsServed: number;
  rating: number;
  reviews: number;
  price?: string;
}

export type InterviewStage = 'introduction' | 'scope' | 'communication' | 'offer';

export type ScopeLevel = 'observer' | 'reviewer' | 'gatekeeper';

export type NotificationFrequency = 'realtime' | 'hourly' | 'daily' | 'weekly';

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  isPrivate: boolean;
  language?: string;
  starCount?: number;
}

export interface InterviewConfig {
  selectedRepositories: string[];
  scopeLevel: ScopeLevel;
  notificationFrequency: NotificationFrequency;
  slackConnected: boolean;
}

export interface Message {
  id: string;
  type: 'agent' | 'user' | 'system';
  content: string;
  timestamp: Date;
  component?: React.ReactNode;
}

export interface InterviewRoomProps {
  agent: AgentCard;
  isOpen: boolean;
  onClose: () => void;
  onHire: (agentId: string) => void;
}

export interface InterviewFlowProps {
  agent: AgentCard;
  onComplete: (config: InterviewConfig) => void;
}

export interface ResumeProfileProps {
  agent: AgentCard;
}

export interface ConversationPanelProps {
  messages: Message[];
  isThinking: boolean;
  onUserResponse?: (response: string) => void;
}

export interface AgentMessageProps {
  content: string;
  timestamp?: Date;
  children?: React.ReactNode;
}

export interface UserMessageProps {
  content: string;
  timestamp?: Date;
}

export interface ChoiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}

export interface RepositorySelectorProps {
  repositories?: Repository[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export interface OfferLetterProps {
  agent: AgentCard;
  config: InterviewConfig;
  onSign: () => void;
  isSigned: boolean;
}

export interface ThinkingIndicatorProps {
  className?: string;
}
