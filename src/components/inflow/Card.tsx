import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MessageCircle, ExternalLink, Mail, Github, Twitter, Slack, FileText, Trello, Figma } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CardData, ReactionType, SourcePlatform } from './types';
import { getCardArt } from './CardArt';
import { getIcon, getAgentIcon, getAgentColor, getAgentAvatar } from './CardIcons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReactionPicker } from './ReactionPicker';
import { CommentDialog } from './CommentDialog';

// Map source platforms to icons
const sourceIconMap: Record<SourcePlatform, React.ComponentType<{ size: number; className?: string }>> = {
  gmail: Mail,
  github: Github,
  twitter: Twitter,
  slack: Slack,
  notion: FileText,
  linear: Trello,
  figma: Figma,
  jira: Trello,
};

interface CardProps {
  data: CardData;
  onClick: () => void;
  currentUserId?: string; // For checking if user is mentioned
  currentUserName?: string;
  onReactionAdd?: (cardId: number, reactionType: ReactionType) => void;
  onReactionRemove?: (cardId: number, reactionType: ReactionType) => void;
  onCommentAdd?: (cardId: number, content: string) => void;
}

// Smooth, fast transition for layout animations
const cardTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 0.5
};

// Helper function to highlight mentions in text
const highlightMentions = (text: string, mentions?: CardData['mentions'], currentUserId?: string): React.ReactNode => {
  if (!mentions || mentions.length === 0) return text;
  
  // Check if current user is mentioned
  const isCurrentUserMentioned = currentUserId && mentions.some(m => m.userId === currentUserId);
  
  if (!isCurrentUserMentioned) return text;
  
  // Simple regex to find @username patterns
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /@(\w+)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // Check if this mention is for current user
    const mention = mentions.find(m => m.userName.toLowerCase() === match[1].toLowerCase());
    if (mention && mention.userId === currentUserId) {
      parts.push(
        <span key={match.index} className="bg-yellow-200/80 px-1 rounded font-medium">
          {match[0]}
        </span>
      );
    } else {
      parts.push(match[0]);
    }
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? <>{parts}</> : text;
};

export function Card({ 
  data, 
  onClick, 
  currentUserId,
  currentUserName,
  onReactionAdd,
  onReactionRemove,
  onCommentAdd,
}: CardProps) {
  const navigate = useNavigate();
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses: Record<string, string> = {
    '1x1': 'col-span-1 row-span-1',
    '2x1': 'col-span-1 md:col-span-2 row-span-1',
    '1x2': 'col-span-1 row-span-2',
    '2x2': 'col-span-1 md:col-span-2 row-span-2',
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const isVoice = data.type === 'voice';
  
  // Check if current user is mentioned
  const isMentioned = currentUserId && data.mentions?.some(m => m.userId === currentUserId);
  
  // Calculate reaction counts
  const reactions = data.reactions || [];
  const reactionCounts = reactions.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {} as Record<ReactionType, number>);
  
  const totalReactions = reactions.length;
  const hasReactions = totalReactions > 0;
  const hasComments = (data.comments ?? 0) > 0 || (data.commentsList?.length ?? 0) > 0;

  const handleReactionAdd = (reactionType: ReactionType) => {
    onReactionAdd?.(data.id, reactionType);
  };

  const handleReactionRemove = (reactionType: ReactionType) => {
    onReactionRemove?.(data.id, reactionType);
  };

  const handleCommentAdd = (content: string) => {
    onCommentAdd?.(data.id, content);
  };

  // Get source count text
  const getSourceText = () => {
    if (!data.sourceCount) return null;
    
    const platformNames: Record<SourcePlatform, string> = {
      gmail: 'emails',
      github: 'commits',
      twitter: 'tweets',
      slack: 'messages',
      notion: 'documents',
      linear: 'issues',
      figma: 'designs',
      jira: 'tickets',
    };
    
    return `Summarized from ${data.sourceCount} ${platformNames[data.sourcePlatform]}`;
  };

  const SourceIcon = sourceIconMap[data.sourcePlatform];

  return (
    <motion.div
      layoutId={`card-container-${data.id}`}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: cardTransition,
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${sizeClasses[data.size]} ${
        isMentioned 
          ? 'bg-orange-50/30 border-orange-200 shadow-md' 
          : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
      } hover:shadow-xl`}
      whileHover={{ scale: 1.02, zIndex: 10, transition: { duration: 0.2 } }}
    >
      {/* Mention indicator - Left glow bar */}
      {isMentioned && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 z-30" />
      )}

      <motion.div
        layoutId={`card-art-${data.id}`}
        transition={cardTransition}
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
      >
        {getCardArt(data.type)}
      </motion.div>

      {/* Gradient overlay */}
      <div 
        className={`absolute inset-0 z-10 bg-gradient-to-t ${
          isVoice 
            ? 'from-[#FFD700]/90 via-[#FFD700]/20 to-transparent' 
            : 'from-white/90 via-white/40 to-transparent'
        }`} 
      />

      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
        {/* Content area with 3D transform */}
        <div style={{ transform: "translateZ(20px)" }} className="flex flex-col h-full pointer-events-none">
          {/* Top Section - Agent Byline */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {/* Agent Byline - 像报纸的署名行，带头像和动态图标 */}
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${getAgentColor(data.agent.type)}`}>
                {/* Emoji or Avatar */}
                {data.agent.emoji ? (
                  <span className="text-xs">{data.agent.emoji}</span>
                ) : (
                  <Avatar className="h-4 w-4 flex-shrink-0">
                    {(() => {
                      const avatarInfo = getAgentAvatar(data.agent);
                      if (data.agent.avatar) {
                        return (
                          <>
                            <AvatarImage src={data.agent.avatar} alt={data.agent.name} />
                            <AvatarFallback className="text-[8px] leading-none">
                              {avatarInfo.fallback}
                            </AvatarFallback>
                          </>
                        );
                      }
                      return (
                        <AvatarFallback className="text-[10px] leading-none font-semibold">
                          {avatarInfo.fallback}
                        </AvatarFallback>
                      );
                    })()}
                  </Avatar>
                )}
                
                <span className="font-mono text-[10px] uppercase tracking-wider font-medium flex items-center gap-1">
                  Via {data.agent.displayName || data.agent.name}
                  {/* Dynamic icon to indicate real-time nature */}
                  {data.agent.type !== 'human-post' && (
                    <span className="animate-pulse">✨</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Middle Section - Content */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.h3
              layoutId={`card-title-${data.id}`}
              transition={cardTransition}
              className={`font-bold tracking-tight leading-tight mb-2 text-stone-900 ${
                data.size === '2x2' ? 'text-2xl md:text-3xl' : 'text-lg'
              }`}
            >
              {highlightMentions(data.title, data.mentions, currentUserId)}
            </motion.h3>

            {data.size !== '1x1' && (
              <p className="text-sm line-clamp-2 leading-relaxed text-stone-600 font-medium">
                {highlightMentions(data.summary, data.mentions, currentUserId)}
              </p>
            )}

            {/* Related Documents */}
            {data.relatedDocs && data.relatedDocs.length > 0 && (
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {data.relatedDocs.map((doc) => (
                  <span
                    key={doc.id}
                    className="text-xs text-stone-500 hover:text-stone-700 flex items-center gap-1"
                  >
                    🔗 {doc.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Section - Time & Interactions */}
          <div className="flex flex-col gap-2 mt-auto pt-2 pointer-events-auto">
          {/* Metadata Footer - Source Count */}
          {data.sourceCount && getSourceText() && (
            <div className="text-[10px] text-stone-400 font-mono">
              {getSourceText()}
            </div>
          )}

          <div className="flex items-center justify-between">
            {/* Left side - Source Platform (on hover) */}
            <div className="flex-1">
              {isHovered && SourceIcon && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-stone-600 transition-colors"
                  title={`View on ${data.sourcePlatform}`}
                >
                  <SourceIcon size={12} />
                  <ExternalLink size={10} />
                </motion.div>
              )}
            </div>

            {/* Right side - Time & Interactions */}
            <div className="flex items-center gap-3 text-stone-500">
              {/* Time */}
              <span className="text-xs text-stone-400">
                {data.timeAgo}
              </span>

              {/* Reactions - Clickable for quick reaction */}
              {hasReactions && (
                <div className="flex items-center gap-1">
                  {Object.entries(reactionCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 2)
                    .map(([type, count]) => {
                      const userReacted = reactions.some(
                        r => r.type === type && r.userId === currentUserId
                      );
                      
                      return (
                        <motion.button
                          key={type}
                          onClick={(e) => {
                            e.stopPropagation();
                            userReacted 
                              ? handleReactionRemove(type as ReactionType)
                              : handleReactionAdd(type as ReactionType);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            text-xs flex items-center gap-0.5 px-1.5 py-0.5 rounded-md
                            transition-all cursor-pointer
                            ${userReacted 
                              ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                              : 'hover:bg-stone-100'
                            }
                          `}
                          title={userReacted ? 'Remove reaction' : 'Add reaction'}
                        >
                          <span>{type}</span>
                          <span className={userReacted ? 'text-orange-600' : 'text-stone-400'}>
                            {count}
                          </span>
                        </motion.button>
                      );
                    })}
                </div>
              )}

              {/* Comments count */}
              {hasComments && (
                <span className="text-xs flex items-center gap-1 text-stone-400">
                  <MessageCircle size={12} />
                  {data.commentsList?.length || data.comments || 0}
                </span>
              )}

              {/* Interaction buttons - Show on hover, separate z-index context */}
              <div className="relative z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
                <ReactionPicker
                  reactions={reactions}
                  currentUserId={currentUserId}
                  onReactionAdd={handleReactionAdd}
                  onReactionRemove={handleReactionRemove}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCommentDialogOpen(true);
                  }}
                  className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                  title="Add comment"
                >
                  <MessageCircle size={14} className="text-stone-400 hover:text-stone-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Comment Dialog */}
      <CommentDialog
        card={data}
        open={commentDialogOpen}
        onOpenChange={setCommentDialogOpen}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        onCommentAdd={handleCommentAdd}
      />
    </motion.div>
  );
}
