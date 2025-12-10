import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Smile } from 'lucide-react';
import { ReactionType, Reaction } from './types';
import { motion } from 'framer-motion';

interface ReactionPickerProps {
  reactions?: Reaction[];
  currentUserId?: string;
  onReactionAdd: (reactionType: ReactionType) => void;
  onReactionRemove: (reactionType: ReactionType) => void;
}

const REACTION_OPTIONS: ReactionType[] = ['👍', '❤️', '😂', '🎉', '🔥', '💡', '👏', '🚀'];

export function ReactionPicker({ 
  reactions = [], 
  currentUserId,
  onReactionAdd, 
  onReactionRemove 
}: ReactionPickerProps) {
  const [open, setOpen] = useState(false);

  // Group reactions by type
  const reactionGroups = REACTION_OPTIONS.map(type => ({
    type,
    count: reactions.filter(r => r.type === type).length,
    userReacted: currentUserId ? reactions.some(r => r.type === type && r.userId === currentUserId) : false
  }));

  const handleReactionClick = (type: ReactionType) => {
    const userReacted = reactionGroups.find(g => g.type === type)?.userReacted;
    
    if (userReacted) {
      onReactionRemove(type);
    } else {
      onReactionAdd(type);
    }
    
    // Keep popover open for quick multiple reactions
    // setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="p-1 hover:bg-stone-100 rounded-full transition-colors"
          title="Add reaction"
        >
          <Smile size={14} className="text-stone-400 hover:text-stone-600" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-2 bg-white border-stone-200 shadow-lg"
        align="end"
        side="top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1">
          {REACTION_OPTIONS.map((type) => {
            const group = reactionGroups.find(g => g.type === type);
            const count = group?.count || 0;
            const userReacted = group?.userReacted || false;
            
            return (
              <motion.button
                key={type}
                onClick={() => handleReactionClick(type)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  relative px-2 py-1.5 rounded-md text-lg transition-all
                  ${userReacted 
                    ? 'bg-orange-100 hover:bg-orange-200' 
                    : 'hover:bg-stone-100'
                  }
                `}
                title={`${type} ${count > 0 ? `(${count})` : ''}`}
              >
                <span>{type}</span>
                {count > 0 && (
                  <span className={`
                    absolute -top-1 -right-1 text-[10px] px-1 rounded-full
                    ${userReacted ? 'bg-orange-500 text-white' : 'bg-stone-500 text-white'}
                  `}>
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

