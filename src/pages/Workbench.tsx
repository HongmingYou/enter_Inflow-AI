import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, MessageSquare, Sparkles, Database, Paperclip } from 'lucide-react';
import { ChatInterface } from '@/components/inflow/ChatInterface';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DataSource {
  id: string;
  name: string;
  type: 'document' | 'database' | 'api';
  size: string;
  lastUpdated: string;
  isSelected?: boolean;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isHighlighted?: boolean;
}

// Mock data - replace with real data
const MOCK_SOURCES: DataSource[] = [
  { id: '1', name: 'server_logs.txt', type: 'document', size: '2.4 MB', lastUpdated: '2h ago' },
  { id: '2', name: 'customer_feedback.csv', type: 'document', size: '856 KB', lastUpdated: '5h ago' },
  { id: '3', name: 'Analytics DB', type: 'database', size: '124 MB', lastUpdated: '1d ago' },
  { id: '4', name: 'GitHub API', type: 'api', size: 'Live', lastUpdated: 'Now' },
];

const MOCK_CHAT_HISTORY: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: '分析最近的服务器性能数据',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    role: 'assistant',
    content: '正在分析 server_logs.txt 中的性能数据...\n\n发现关键指标：\n- 平均响应时间从 120ms 降低到 90ms（降低 30ms）\n- 错误率下降 15%\n- CPU 使用率优化 20%',
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: '3',
    role: 'user',
    content: '这个优化是因为什么？',
    timestamp: new Date(Date.now() - 3400000),
  },
  {
    id: '4',
    role: 'assistant',
    content: '根据日志分析，主要改进来自：\n1. 数据库查询优化（添加索引）\n2. 缓存策略改进（Redis 层）\n3. 异步处理优化',
    timestamp: new Date(Date.now() - 3300000),
    isHighlighted: false, // Will be set to true via URL params
  },
];

export default function Workbench() {
  const { workspaceId } = useParams();
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get('card_id');
  const msgId = searchParams.get('msg_id');
  
  const [sources, setSources] = useState<DataSource[]>(MOCK_SOURCES);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(MOCK_CHAT_HISTORY);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Context restoration effect
  useEffect(() => {
    if (cardId || msgId) {
      // Simulate context restoration
      const timer = setTimeout(() => {
        // 1. Highlight related data sources
        if (cardId) {
          setSources(prev => prev.map(source => 
            source.id === '1' ? { ...source, isSelected: true } : source
          ));
          setSelectedSources(['1']);
        }

        // 2. Scroll to and highlight the specific message
        if (msgId) {
          setChatHistory(prev => prev.map((msg, idx) => 
            idx === 3 ? { ...msg, isHighlighted: true } : msg
          ));

          // Scroll to highlighted message
          setTimeout(() => {
            const highlightedElement = document.querySelector('[data-highlighted="true"]');
            if (highlightedElement) {
              highlightedElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }
          }, 100);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [cardId, msgId]);

  // Clear highlight after 3 seconds
  useEffect(() => {
    const highlighted = chatHistory.find(msg => msg.isHighlighted);
    if (highlighted) {
      const timer = setTimeout(() => {
        setChatHistory(prev => prev.map(msg => ({ ...msg, isHighlighted: false })));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [chatHistory]);

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const getSourceIcon = (type: DataSource['type']) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'database':
        return Database;
      case 'api':
        return Sparkles;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header with Breadcrumb */}
      <header className="border-b border-stone-200 bg-white/50 backdrop-blur-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
            </Link>
            <div className="text-stone-400">/</div>
            <h1 className="text-lg font-semibold text-stone-900">
              Workbench {workspaceId && `· ${workspaceId}`}
            </h1>
          </div>

          {(cardId || msgId) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full"
            >
              Context restored from Dashboard
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content - Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Data Sources */}
        <div className="w-80 border-r border-stone-200 bg-white/30 backdrop-blur-sm flex flex-col">
          <div className="p-4 border-b border-stone-200">
            <h2 className="text-sm font-semibold text-stone-900 mb-1">Data Sources</h2>
            <p className="text-xs text-stone-500">
              {selectedSources.length} of {sources.length} selected
            </p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              <AnimatePresence>
                {sources.map((source) => {
                  const Icon = getSourceIcon(source.type);
                  const isSelected = selectedSources.includes(source.id) || source.isSelected;
                  
                  return (
                    <motion.button
                      key={source.id}
                      layout
                      onClick={() => toggleSource(source.id)}
                      className={cn(
                        "w-full p-3 rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "bg-orange-50 border-orange-300 shadow-sm"
                          : "bg-white border-stone-200 hover:border-stone-300"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          isSelected ? "bg-orange-100" : "bg-stone-100"
                        )}>
                          <Icon size={16} className={cn(
                            isSelected ? "text-orange-600" : "text-stone-600"
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-stone-900 truncate">
                            {source.name}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {source.size} · {source.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-stone-200">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Paperclip size={14} />
              Add Data Source
            </Button>
          </div>
        </div>

        {/* Middle Panel - Chat Interface */}
        <div className="flex-1 flex flex-col bg-stone-50">
          <div className="flex-1 overflow-hidden" ref={chatContainerRef}>
            <ScrollArea className="h-full">
              <div className="max-w-3xl mx-auto p-6 space-y-4">
                {chatHistory.map((message) => (
                  <motion.div
                    key={message.id}
                    data-highlighted={message.isHighlighted}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      backgroundColor: message.isHighlighted 
                        ? 'rgba(254, 243, 199, 0.5)' 
                        : 'transparent'
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "p-4 rounded-2xl",
                      message.role === 'user' 
                        ? "bg-white border border-stone-200 ml-12" 
                        : "bg-stone-100/50 mr-12"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg flex-shrink-0",
                        message.role === 'user' 
                          ? "bg-orange-100" 
                          : "bg-orange-500"
                      )}>
                        {message.role === 'user' ? (
                          <MessageSquare size={16} className="text-orange-600" />
                        ) : (
                          <Sparkles size={16} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-stone-900 whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className="text-xs text-stone-400 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Input */}
          <div className="border-t border-stone-200 bg-white p-4">
            <div className="max-w-3xl mx-auto">
              <ChatInterface />
            </div>
          </div>
        </div>

        {/* Right Panel - Artifacts/Output */}
        <div className="w-96 border-l border-stone-200 bg-white/30 backdrop-blur-sm flex flex-col">
          <div className="p-4 border-b border-stone-200">
            <h2 className="text-sm font-semibold text-stone-900">Artifacts</h2>
            <p className="text-xs text-stone-500 mt-1">Generated outputs and insights</p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="text-sm font-medium text-stone-900 mb-2">
                  Performance Report
                </div>
                <div className="text-xs text-stone-600">
                  Generated from server logs analysis
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="text-sm font-medium text-stone-900 mb-2">
                  Optimization Recommendations
                </div>
                <div className="text-xs text-stone-600">
                  3 actionable items identified
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
