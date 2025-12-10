import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Hash, Tag, Clock, User, FileText } from 'lucide-react';
import { CardData } from './types';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cards: CardData[];
  onCardSelect?: (cardId: number) => void;
}

export function SearchModal({ open, onOpenChange, cards, onCardSelect }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return cards
      .filter(card => {
        const titleMatch = card.title.toLowerCase().includes(query);
        const summaryMatch = card.summary.toLowerCase().includes(query);
        const detailsMatch = card.details.toLowerCase().includes(query);
        const tagsMatch = card.tags.some(tag => tag.toLowerCase().includes(query));
        const agentMatch = card.agent.name.toLowerCase().includes(query) || 
                          card.agent.displayName?.toLowerCase().includes(query);
        
        return titleMatch || summaryMatch || detailsMatch || tagsMatch || agentMatch;
      })
      .map(card => {
        // Calculate relevance score
        const query = searchQuery.toLowerCase();
        let score = 0;
        
        if (card.title.toLowerCase().includes(query)) score += 10;
        if (card.summary.toLowerCase().includes(query)) score += 5;
        if (card.tags.some(tag => tag.toLowerCase().includes(query))) score += 3;
        if (card.agent.name.toLowerCase().includes(query)) score += 2;
        if (card.details.toLowerCase().includes(query)) score += 1;
        
        return { card, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(({ card }) => card)
      .slice(0, 10); // Limit to top 10 results
  }, [searchQuery, cards]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
        e.preventDefault();
        handleCardClick(searchResults[selectedIndex].id);
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, searchResults, selectedIndex, onOpenChange]);

  const handleCardClick = (cardId: number) => {
    onCardSelect?.(cardId);
    onOpenChange(false);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-orange-200 text-orange-900 rounded px-0.5">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0 overflow-hidden sm:rounded-xl">
        <div className="flex flex-col h-full">
          {/* Search Header */}
          <div className="p-6 border-b border-stone-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg">
                <Search size={20} className="text-white" />
              </div>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索卡片标题、摘要、标签、Agent..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-stone-200 focus:border-orange-400 focus:outline-none bg-white text-stone-900 placeholder:text-stone-400 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={16} className="text-stone-400" />
                  </button>
                )}
              </div>
            </div>
            {searchQuery && (
              <div className="mt-3 text-sm text-stone-600">
                找到 <span className="font-semibold text-orange-600">{searchResults.length}</span> 个结果
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto p-6 bg-stone-50">
            <AnimatePresence mode="wait">
              {!searchQuery ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="p-4 rounded-full bg-stone-100 mb-4">
                    <Search size={32} className="text-stone-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">开始搜索</h3>
                  <p className="text-stone-500 max-w-md">
                    输入关键词搜索dashboard内的卡片信息，支持搜索标题、摘要、标签和Agent名称
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2 justify-center">
                    {['Acme Corp', '延迟', 'AI', 'Bug', 'Linear'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:bg-orange-50 text-sm text-stone-600 hover:text-orange-700 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : searchResults.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="p-4 rounded-full bg-stone-100 mb-4">
                    <Search size={32} className="text-stone-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">未找到结果</h3>
                  <p className="text-stone-500">
                    尝试使用其他关键词或检查拼写
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {searchResults.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCardClick(card.id)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${selectedIndex === index
                          ? 'border-orange-400 bg-white shadow-lg scale-[1.02]'
                          : 'border-stone-200 bg-white hover:border-orange-300 hover:shadow-md'
                        }
                      `}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h4 className="font-bold text-lg text-stone-900 mb-1.5 line-clamp-1">
                            {highlightText(card.title, searchQuery)}
                          </h4>
                          
                          {/* Summary */}
                          <p className="text-sm text-stone-600 mb-3 line-clamp-2">
                            {highlightText(card.summary, searchQuery)}
                          </p>
                          
                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              <span>{card.agent.displayName || card.agent.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{card.timeAgo}</span>
                            </div>
                            {card.tags.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Tag size={12} />
                                <span>{card.tags.slice(0, 2).join(', ')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Arrow indicator */}
                        <motion.div
                          className={`
                            flex-shrink-0 p-2 rounded-lg transition-colors
                            ${selectedIndex === index
                              ? 'bg-orange-100 text-orange-600'
                              : 'bg-stone-100 text-stone-400 group-hover:bg-orange-50'
                            }
                          `}
                          whileHover={{ scale: 1.1 }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer hints */}
          {searchQuery && searchResults.length > 0 && (
            <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 text-xs text-stone-500 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>↑↓ 导航</span>
                <span>↵ 选择</span>
                <span>Esc 关闭</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText size={12} />
                <span>共 {searchResults.length} 个结果</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
