import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';
import { Card } from './Card';
import { ExpandedCard } from './ExpandedCard';
import { MOCK_DATA } from './data';
import { CardData, ReactionType, Reaction, Comment } from './types';

export function Inflow() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [cardInteractions, setCardInteractions] = useState<Record<number, {
    reactions: Reaction[];
    comments: Comment[];
  }>>({});
  
  // Merge MOCK_DATA with interactions
  const cardsWithInteractions = useMemo(() => {
    return MOCK_DATA.map(card => ({
      ...card,
      reactions: cardInteractions[card.id]?.reactions || card.reactions || [],
      commentsList: cardInteractions[card.id]?.comments || card.commentsList || [],
      comments: (cardInteractions[card.id]?.comments?.length || card.commentsList?.length || card.comments || 0),
    })) as CardData[];
  }, [cardInteractions]);
  
  const selectedItem = cardsWithInteractions.find(item => item.id === selectedId);

  // Briefing State
  const briefings = [
    "Acme Corp 签约确认，研发团队修复了 OAuth 漏洞。",
    "Q4 目标进展顺利，API 延迟优化成效显著。",
    "团队迎来新成员，用户好评持续增长。",
    "竞品动态需关注，法务合规工作推进中。"
  ];
  const [briefing, setBriefing] = useState(briefings[0]);
  const [isGeneratingBriefing, setIsGeneratingBriefing] = useState(false);

  // Generate Briefing Function
  const generateDailyBriefing = () => {
    setIsGeneratingBriefing(true);
    setTimeout(() => {
      const randomBriefing = briefings[Math.floor(Math.random() * briefings.length)];
      setBriefing(randomBriefing);
      setIsGeneratingBriefing(false);
    }, 1500);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedId(null);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Handle reaction add
  const handleReactionAdd = (cardId: number, reactionType: ReactionType) => {
    setCardInteractions(prev => {
      const current = prev[cardId] || { reactions: [], comments: [] };
      const existingReaction = current.reactions.find(
        r => r.type === reactionType && r.userId === 'jason'
      );
      
      if (existingReaction) {
        // Already reacted, do nothing (should be handled by remove)
        return prev;
      }
      
      const newReaction: Reaction = {
        id: `reaction-${cardId}-${Date.now()}`,
        type: reactionType,
        userId: 'jason',
        userName: 'Jason',
        timestamp: new Date(),
      };
      
      return {
        ...prev,
        [cardId]: {
          ...current,
          reactions: [...current.reactions, newReaction],
        },
      };
    });
  };

  // Handle reaction remove
  const handleReactionRemove = (cardId: number, reactionType: ReactionType) => {
    setCardInteractions(prev => {
      const current = prev[cardId] || { reactions: [], comments: [] };
      const filteredReactions = current.reactions.filter(
        r => !(r.type === reactionType && r.userId === 'jason')
      );
      
      return {
        ...prev,
        [cardId]: {
          ...current,
          reactions: filteredReactions,
        },
      };
    });
  };

  // Handle comment add
  const handleCommentAdd = (cardId: number, content: string) => {
    setCardInteractions(prev => {
      const current = prev[cardId] || { reactions: [], comments: [] };
      const newComment: Comment = {
        id: `comment-${cardId}-${Date.now()}`,
        userId: 'jason',
        userName: 'Jason',
        content,
        timestamp: new Date(),
      };
      
      return {
        ...prev,
        [cardId]: {
          ...current,
          comments: [...current.comments, newComment],
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Header */}
      <header className="pt-20 pb-10 px-6 max-w-7xl mx-auto border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-stone-500 font-mono text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              {format(new Date(), 'EEEE, MMMM d, yyyy', { locale: zhCN })}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-stone-900">
              Inflow.
            </h1>
          </div>

          <div className="text-stone-500 text-sm md:text-right max-w-lg leading-relaxed flex flex-col items-start md:items-end gap-2">
            <div className="flex items-start gap-2">
              <p className="flex-1">
                <span className="text-stone-900 font-bold uppercase text-xs tracking-wide mr-2">Morning Brief</span>
                {isGeneratingBriefing ? (
                  <span className="animate-pulse text-stone-400">AI 正在阅读团队动态...</span>
                ) : (
                  <span className="italic">{briefing}</span>
                )}
              </p>
              <button
                onClick={generateDailyBriefing}
                disabled={isGeneratingBriefing}
                className="p-1.5 hover:bg-stone-200 rounded-full transition-colors text-stone-400 hover:text-stone-600"
                title="Generate new briefing"
              >
                <RefreshCw size={14} className={isGeneratingBriefing ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-5 grid-flow-row-dense">
          {cardsWithInteractions.map((card) => (
            <Card
              key={card.id}
              data={card}
              onClick={() => setSelectedId(card.id)}
              currentUserId="jason"
              currentUserName="Jason"
              onReactionAdd={handleReactionAdd}
              onReactionRemove={handleReactionRemove}
              onCommentAdd={handleCommentAdd}
            />
          ))}
        </div>
      </main>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <ExpandedCard
            selectedItem={selectedItem}
            setSelectedId={setSelectedId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
