import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardData, Comment } from './types';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';
import { Send } from 'lucide-react';

interface CommentDialogProps {
  card: CardData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUserId?: string;
  currentUserName?: string;
  onCommentAdd: (content: string) => void;
}

export function CommentDialog({
  card,
  open,
  onOpenChange,
  currentUserId = 'jason',
  currentUserName = 'Jason',
  onCommentAdd,
}: CommentDialogProps) {
  const [commentText, setCommentText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const comments = card.commentsList || [];

  useEffect(() => {
    if (open && textareaRef.current) {
      // Focus textarea when dialog opens
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSend = () => {
    if (commentText.trim()) {
      onCommentAdd(commentText.trim());
      setCommentText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {card.title}
          </DialogTitle>
          <p className="text-sm text-stone-600 mt-1 line-clamp-2">
            {card.summary}
          </p>
        </DialogHeader>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-4 min-h-[200px] max-h-[400px]">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm">
              还没有评论，来第一个发言吧
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback className="bg-stone-200 text-stone-600 text-xs">
                    {comment.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-stone-900">
                      {comment.userName}
                    </span>
                    <span className="text-xs text-stone-400">
                      {formatDistanceToNow(comment.timestamp, {
                        addSuffix: true,
                        locale: zhCN,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="mt-4 pt-4 border-t border-stone-200">
          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-orange-100 text-orange-700 text-xs">
                {currentUserName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Textarea
                ref={textareaRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="写下你的评论... (Enter 发送，Shift+Enter 换行)"
                className="min-h-[60px] resize-none"
                rows={2}
              />
              <Button
                onClick={handleSend}
                disabled={!commentText.trim()}
                size="icon"
                className="self-end"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

