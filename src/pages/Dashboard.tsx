import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';
import { Card } from '@/components/inflow/Card';
import { ExpandedCard } from '@/components/inflow/ExpandedCard';
import { FilterBar } from '@/components/inflow/FilterBar';
import { MOCK_DATA } from '@/components/inflow/data';
import { CardData, ReactionType, Reaction, Comment, CategoryType, SourcePlatform } from '@/components/inflow/types';

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [cardInteractions, setCardInteractions] = useState<Record<number, {
    reactions: Reaction[];
    comments: Comment[];
  }>>({});
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedSource, setSelectedSource] = useState<SourcePlatform | 'all'>('all');
  
  // Merge MOCK_DATA with interactions
  const cardsWithInteractions = useMemo(() => {
    return MOCK_DATA.map(card => ({
      ...card,
      reactions: cardInteractions[card.id]?.reactions || card.reactions || [],
      commentsList: cardInteractions[card.id]?.comments || card.commentsList || [],
      comments: (cardInteractions[card.id]?.comments?.length || card.commentsList?.length || card.comments || 0),
    })) as CardData[];
  }, [cardInteractions]);
  
  // Filtered cards based on category and source
  const filteredCards = useMemo(() => {
    return cardsWithInteractions.filter(card => {
      const categoryMatch = selectedCategory === 'all' || card.category === selectedCategory;
      const sourceMatch = selectedSource === 'all' || card.sourcePlatform === selectedSource;
      return categoryMatch && sourceMatch;
    });
  }, [cardsWithInteractions, selectedCategory, selectedSource]);
  
  const selectedItem = cardsWithInteractions.find(item => item.id === selectedId);
  
  // Calculate AI status metrics
  const totalEvents = MOCK_DATA.length * 155; // Simulate total scanned events
  const priorityCount = filteredCards.length;

  // AI Status refresh
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh AI Status
  const refreshAIStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
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
    <div className="min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Header */}
      <header className="pt-20 pb-10 px-6 max-w-7xl mx-auto border-b border-stone-200">
        <div className="flex flex-col gap-6">
          {/* Top Row: Title and AI Status */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-stone-500 font-mono text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                {format(new Date(), 'EEEE, MMMM d, yyyy', { locale: zhCN })}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-stone-900">
                InFlow.
              </h1>
            </div>

            {/* Dynamic AI Status */}
            <div className="text-stone-500 text-sm md:text-right max-w-lg leading-relaxed flex flex-col items-start md:items-end gap-2">
              <div className="flex items-start gap-2">
                <p className="flex-1">
                  <span className="text-stone-900 font-bold uppercase text-xs tracking-wide mr-2 flex items-center gap-1">
                    <span className="text-orange-500">⚡️</span> Daily Digest
                  </span>
                  {isRefreshing ? (
                    <span className="animate-pulse text-stone-400">AI 正在扫描最新动态...</span>
                  ) : (
                    <span className="italic">
                      Scanned <span className="font-semibold text-stone-700">{totalEvents.toLocaleString()}</span> events today, 
                      filtered down to <span className="font-semibold text-stone-700">{priorityCount}</span> priorities.
                    </span>
                  )}
                </p>
                <button
                  onClick={refreshAIStatus}
                  disabled={isRefreshing}
                  className="p-1.5 hover:bg-stone-200 rounded-full transition-colors text-stone-400 hover:text-stone-600"
                  title="Refresh AI status"
                >
                  <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSource={selectedSource}
            onSourceChange={setSelectedSource}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-5 grid-flow-row-dense">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
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
          </AnimatePresence>
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
