import { useRef, useEffect } from 'react';
import { AgentMessage } from './AgentMessage';
import { UserMessage } from './UserMessage';
import { ThinkingIndicator } from './ThinkingIndicator';
import type { ConversationPanelProps } from './types';

export function ConversationPanel({ messages, isThinking }: ConversationPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6 space-y-4"
    >
      {messages.map((message) => {
        if (message.type === 'agent') {
          return (
            <AgentMessage 
              key={message.id} 
              content={message.content}
              timestamp={message.timestamp}
            >
              {message.component}
            </AgentMessage>
          );
        }
        
        if (message.type === 'user') {
          return (
            <UserMessage 
              key={message.id} 
              content={message.content}
              timestamp={message.timestamp}
            />
          );
        }

        // System message (like stage transitions)
        return (
          <div key={message.id} className="flex justify-center py-2">
            <span className="text-xs text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
              {message.content}
            </span>
          </div>
        );
      })}
      
      {isThinking && (
        <ThinkingIndicator />
      )}
    </div>
  );
}
