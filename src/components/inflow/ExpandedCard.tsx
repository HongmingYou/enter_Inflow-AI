import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Fingerprint, ArrowUpRight, Sparkles } from 'lucide-react';
import { CardData } from './types';
import { getCardArt } from './CardArt';
import { getIcon } from './CardIcons';
import { ChatInterface } from './ChatInterface';

interface ExpandedCardProps {
  selectedItem: CardData;
  setSelectedId: (id: number | null) => void;
}

// Smooth, fast transition for layout animations
const layoutTransition = {
  type: "spring",
  stiffness: 500,
  damping: 35,
  mass: 0.5
};

export function ExpandedCard({ selectedItem, setSelectedId }: ExpandedCardProps) {
  const [showChat, setShowChat] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setShowChat(false);
    setIsClosing(true);
    // Small delay to let the content fade out before layout animation
    setTimeout(() => {
      setSelectedId(null);
    }, 50);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-stone-200/60 backdrop-blur-xl z-40"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <motion.div
          layoutId={`card-container-${selectedItem.id}`}
          transition={layoutTransition}
          className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto ring-1 ring-black/5 max-h-[85vh] md:max-h-[90vh] relative"
        >
          {/* Full-width art background - this is what animates back to the card */}
          <motion.div
            layoutId={`card-art-${selectedItem.id}`}
            transition={layoutTransition}
            className="absolute inset-0 w-full h-full"
          >
            {getCardArt(selectedItem.type)}
          </motion.div>

          {/* Content wrapper - fades in/out independently */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: isClosing ? 0.08 : 0.2, delay: isClosing ? 0 : 0.1 }}
            className="relative z-10 flex flex-col lg:flex-row h-full min-h-[500px] lg:min-h-[600px]"
          >
            {/* Left - Visual Area with title */}
            <div className="relative h-72 lg:h-auto w-full lg:w-1/2 shrink-0 overflow-hidden">
              {/* Close button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                className="absolute top-6 right-6 z-30 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-stone-600 hover:text-black transition-colors shadow-sm cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Title area at bottom */}
              <div className="absolute bottom-0 left-0 p-8 md:p-10 lg:p-12 w-full bg-gradient-to-t from-white via-white/80 to-transparent pt-32 flex flex-col justify-end h-full pointer-events-none z-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/50 backdrop-blur-md rounded-lg border border-white/20 shadow-sm">
                    {getIcon(selectedItem.type)}
                  </div>
                  <span className="text-xs font-mono font-medium tracking-wider uppercase text-stone-500">
                    {selectedItem.type} / {selectedItem.meta.split('·')[1]}
                  </span>
                </div>

                <motion.h2
                  layoutId={`card-title-${selectedItem.id}`}
                  transition={layoutTransition}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-stone-900"
                >
                  {selectedItem.title}
                </motion.h2>
              </div>
            </div>

            {/* Right - Details Area */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 overflow-y-auto bg-white text-stone-600 flex flex-col relative z-10">
              {showChat ? (
                <ChatInterface item={selectedItem} onClose={() => setShowChat(false)} />
              ) : (
                <>
                  <div className="flex items-center gap-4 pb-8 mb-8 border-b border-stone-100 text-sm text-stone-400 font-mono shrink-0">
                    <div className="flex items-center gap-2">
                      <Fingerprint size={14} />
                      <span>ID: {selectedItem.id.toString().padStart(4, '0')}</span>
                    </div>
                    <div className="w-px h-4 bg-stone-200"></div>
                    <div>{selectedItem.meta.split('·')[0]}</div>
                  </div>

                  <article className="prose prose-stone prose-lg max-w-none flex-grow">
                    <p className="font-serif text-xl md:text-2xl leading-relaxed text-stone-800">
                      {selectedItem.summary}
                    </p>
                    <div className="my-8 w-12 h-1 bg-stone-200 rounded-full"></div>
                    <p className="leading-relaxed whitespace-pre-line text-stone-600">
                      {selectedItem.details}
                    </p>
                  </article>

                  <div className="mt-12 flex flex-wrap gap-2 shrink-0">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-stone-500 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-stone-100 border-2 border-white flex items-center justify-center text-[10px] text-stone-500 shadow-sm">
                          U{i}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-stone-100 border-2 border-white flex items-center justify-center text-[10px] text-stone-500 pl-1 shadow-sm">
                        +5
                      </div>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setShowChat(true)}
                        className="flex-1 sm:flex-none py-2.5 px-4 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 text-sm font-medium transition-colors border border-stone-200 flex items-center gap-2 justify-center"
                      >
                        <Sparkles size={16} className="text-orange-500" />
                        Ask Agent
                      </button>
                      <button className="flex-1 sm:flex-none py-2.5 px-4 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-stone-200">
                        Open Context
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
