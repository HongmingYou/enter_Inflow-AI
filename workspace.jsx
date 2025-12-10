import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  FileText, 
  Mic, 
  Send, 
  Sparkles, 
  Play, 
  MoreVertical,
  Layout,
  List,
  Grid,
  PenTool,
  ArrowRight,
  Maximize2,
  Clock,
  Settings,
  X
} from 'lucide-react';

export default function NotebookApp() {
  const [input, setInput] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const chatEndRef = useRef(null);
  
  // 模拟数据
  const [sources, setSources] = useState([
    { id: 1, title: 'Q3 2024 Financial Report.pdf', type: 'pdf', selected: true },
    { id: 2, title: 'Project Titan Architecture', type: 'doc', selected: true },
    { id: 3, title: 'Competitor Analysis.txt', type: 'text', selected: false },
    { id: 4, title: 'Meeting_Oct12.mp3', type: 'audio', selected: false },
  ]);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'user', 
      content: '基于 Q3 财报，帮我总结一下主要增长点。' 
    },
    { 
      id: 2, 
      role: 'ai', 
      content: '根据 Q3 财报，主要增长点如下：\n\n**云服务收入同比增长 45%**\n主要得益于新企业客户的签约。这表明我们在企业级市场的渗透率正在稳步提升。\n\n**移动端广告业务回暖**\n环比增长 12%，这是一个非常积极的信号，尤其是在上半年广告市场整体疲软的背景下。\n\n**海外市场拓展顺利**\n亚太地区贡献了新增利润的 30%，证明了全球化战略的有效性。',
      citations: [1, 2]
    }
  ]);

  const [notes, setNotes] = useState([
    {
      id: 101,
      type: 'note',
      title: 'Q3 核心增长摘要',
      content: '云服务增长 45%，移动广告回暖。亚太地区表现强劲，成为新的利润增长引擎。',
      tags: ['Finance', 'Q3'],
      date: '2h ago'
    },
    {
      id: 102,
      type: 'note',
      title: '技术架构风险点',
      content: '目前微服务拆分粒度过细，导致服务间调用延迟增加。建议在 Q4 进行服务合并优化。',
      tags: ['Tech', 'Risk'],
      date: '1d ago'
    },
    {
        id: 103,
        type: 'audio-clip',
        title: 'CEO 关于 AI 战略的发言',
        content: 'Audio clip extracted from 00:14:20. "AI is not just a feature, it is the foundation."',
        duration: '02:14',
        tags: ['Strategy'],
        date: '2d ago'
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSource = (id) => {
    setSources(sources.map(s => s.id === id ? {...s, selected: !s.selected} : s));
  };

  const handleSend = () => {
    if(!input.trim()) return;
    const newMsgId = Date.now();
    setMessages([...messages, { id: newMsgId, role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
        setMessages(prev => [...prev, {
            id: newMsgId + 1,
            role: 'ai',
            content: '好的，我已经捕捉到了这个关键信息。这是一条非常有价值的洞察，我已将其整理为新的笔记卡片。',
            citations: []
        }]);
        setNotes(prev => [{
            id: newMsgId + 2,
            type: 'note',
            title: 'User Insight',
            content: input,
            tags: ['New'],
            date: 'Just now',
            isNew: true
        }, ...prev]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F2F1EE] font-sans text-[#1A1A1A] overflow-hidden selection:bg-orange-100 selection:text-orange-900">
      
      {/* 1. Global Header (悬浮在顶部) */}
      <header className="flex-shrink-0 h-16 flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1A1A1A] text-white rounded-xl flex items-center justify-center font-serif font-bold italic shadow-lg">
            N
          </div>
          <span className="font-semibold text-lg tracking-tight">Workbench</span>
        </div>
        <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-white/50 rounded-full transition-colors">
                <Settings size={20} />
            </button>
            <div className="h-8 w-[1px] bg-gray-300 mx-1"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm cursor-pointer hover:bg-white transition-all">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-[10px] text-white font-bold">
                    JD
                </div>
                <span className="text-xs font-medium text-gray-700">John Doe</span>
            </div>
        </div>
      </header>

      {/* 2. Main Workspace (Flex Row Layout) */}
      <main className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden min-h-0">
        
        {/* === Left Panel: Sources (Fixed Width) === */}
        <div className="w-[280px] flex-shrink-0 flex flex-col bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Panel Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-gray-50 bg-white sticky top-0 z-10">
                <h2 className="font-serif font-bold text-lg">Sources</h2>
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-medium">{sources.length}</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {sources.map(source => (
                    <div 
                        key={source.id}
                        onClick={() => toggleSource(source.id)}
                        className={`group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border
                        ${source.selected 
                            ? 'bg-orange-50/50 border-orange-100/50' 
                            : 'bg-transparent border-transparent hover:bg-gray-50'}
                        `}
                    >
                        <div className={`transition-colors ${source.selected ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            {source.type === 'audio' ? <Mic size={18} /> : <FileText size={18} />}
                        </div>
                        <span className={`text-sm truncate flex-1 ${source.selected ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                            {source.title}
                        </span>
                        {source.selected && <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>}
                    </div>
                ))}
            </div>

            {/* Bottom Action */}
            <div className="p-4 border-t border-gray-50 bg-gray-50/30">
                <button className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:bg-white hover:border-orange-200 hover:text-orange-600 hover:shadow-sm transition-all">
                    <Plus size={16} /> Add Source
                </button>
            </div>
        </div>

        {/* === Center Panel: Chat / Canvas (Flexible) === */}
        <div className="flex-1 flex flex-col bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden relative">
             {/* Panel Header */}
             <div className="h-16 flex-shrink-0 flex items-center justify-between px-8 border-b border-gray-50">
                <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-orange-500" />
                    <span className="font-medium text-sm text-gray-500">AI Assistant</span>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><Clock size={18}/></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><MoreHorizontal size={18}/></button>
                </div>
            </div>

            {/* Chat Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scroll-smooth">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                        {msg.role === 'user' ? (
                            <div className="bg-[#F4F4F2] px-6 py-4 rounded-2xl rounded-tr-sm text-gray-800 text-[15px] font-medium leading-relaxed max-w-[80%]">
                                {msg.content}
                            </div>
                        ) : (
                            <div className="max-w-[90%] pr-4 group">
                                <div className="prose prose-slate max-w-none">
                                    <div className="font-serif text-[17px] leading-8 text-[#2C2C2C]">
                                        {msg.content.split('\n').map((line, i) => (
                                            <div key={i} className="mb-4">
                                                {line.startsWith('**') ? (
                                                    <strong className="block text-gray-900 font-bold font-sans text-base mb-1 mt-4">{line.replace(/\*\*/g, '')}</strong>
                                                ) : (
                                                    <span>{line}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Context Actions */}
                                <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-xs font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
                                        <PenTool size={12}/> Save to Note
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div className="h-24" ref={chatEndRef}></div> {/* Spacer for input */}
            </div>

            {/* Input Area - Absolute Positioning inside the Center Panel */}
            <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white p-1.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-2 ring-1 ring-black/5">
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 flex items-center justify-center transition-all flex-shrink-0">
                        <Plus size={20} />
                    </button>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask anything..." 
                        className="flex-1 bg-transparent border-none focus:ring-0 text-base text-gray-800 placeholder-gray-400 h-10 px-2"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0
                            ${input.trim() 
                                ? 'bg-black text-white hover:bg-gray-800 hover:scale-105' 
                                : 'bg-gray-100 text-gray-300'
                            }`}
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>

        {/* === Right Panel: Studio (Fixed Width) === */}
        <div className="w-[340px] flex-shrink-0 flex flex-col bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Panel Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-gray-50 sticky top-0 bg-white z-10">
                <h2 className="font-serif font-bold text-lg">Studio</h2>
                <div className="flex bg-gray-100 p-0.5 rounded-lg">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
                    >
                        <Grid size={14} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
                    >
                        <List size={14} />
                    </button>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/30">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Create</span>
                <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-sm transition-all group">
                         <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Play size={12} fill="currentColor"/>
                         </div>
                         <span className="text-xs font-medium text-gray-700 group-hover:text-orange-700">Audio</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                         <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Layout size={12} />
                         </div>
                         <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">Deck</span>
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAFA]">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Recent Notes</span>
                {notes.map(note => (
                    <div 
                        key={note.id} 
                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-1">
                                {note.tags.map(tag => (
                                    <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-[9px] uppercase font-bold text-gray-500 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {note.type === 'audio-clip' && <Mic size={12} className="text-orange-500" />}
                        </div>
                        
                        <h3 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug group-hover:text-orange-700 transition-colors">
                            {note.title}
                        </h3>
                        
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                            {note.content}
                        </p>

                        <div className="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-[10px] text-gray-400">{note.date}</span>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded text-gray-500 transition-all">
                                <Maximize2 size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}