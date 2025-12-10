import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { CardData } from './types';

interface ChatInterfaceProps {
  item: CardData;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export function ChatInterface({ item, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `你好！关于 "${item.title}"，你想了解什么？我可以帮你总结要点或起草回复。` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response since we don't have the API key configured
    setTimeout(() => {
      const responses = [
        `关于${item.title}，这是一个非常重要的更新。根据上下文，我建议你关注以下几点：${item.summary}`,
        `基于这条信息，我认为关键要点是：${item.details.slice(0, 100)}...`,
        `这是一个值得关注的动态。标签 ${item.tags.join(', ')} 表明这与团队的核心工作密切相关。`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 rounded-xl border border-stone-200 overflow-hidden shadow-inner">
      <div className="flex items-center justify-between p-3 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-2 text-stone-600 font-medium text-sm">
          <Sparkles size={14} className="text-orange-500" />
          Inflow AI Agent
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-stone-800 text-white'
                : 'bg-white border border-stone-200 text-stone-700 shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-200 rounded-lg p-3 shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:75ms]" />
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:150ms]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="p-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
