import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Github, Slack, Mail, Trello, MessageSquare, 
  Database, Server, CheckCircle2, ArrowRight, 
  Play, Zap, BarChart3, Code2, Users, FileText,
  Search, ShieldAlert
} from 'lucide-react';

/* --- 1. Global Styles & Fonts --- */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #FAFAFA;
      color: #1A1A1A;
      overflow-x: hidden;
    }
    
    .font-serif {
      font-family: 'Source Serif 4', serif;
    }
    
    .text-accent {
      color: #FF6B00;
    }
    
    .bg-accent {
      background-color: #FF6B00;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(0,0,0,0.05);
    }

    /* Custom Scrollbar for a cleaner look */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #FAFAFA;
    }
    ::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #FF6B00;
    }
  `}</style>
);

/* --- 2. Components --- */

// Hero Section Animation Component
const HeroFilterAnimation = () => {
  // Chaos Icons
  const icons = [Github, Slack, Mail, Trello, MessageSquare, Database];
  
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden my-12">
      {/* Left: Chaos (Noise) */}
      <div className="absolute left-0 w-1/3 h-full flex items-center justify-center">
        {Array.from({ length: 15 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              className="absolute text-gray-400 opacity-60"
              initial={{ x: -100, y: (Math.random() - 0.5) * 200, opacity: 0, scale: 0.5 }}
              animate={{ 
                x: ['0%', '200%'], 
                y: [(Math.random() - 0.5) * 200, 0],
                opacity: [0, 0.8, 0],
                scale: [0.8, 1, 0.5]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                delay: Math.random() * 2,
                ease: "linear"
              }}
            >
              <Icon size={20 + Math.random() * 15} />
            </motion.div>
          );
        })}
      </div>

      {/* Center: The Agent Lens */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div 
          className="w-32 h-32 rounded-full border border-orange-500/20 bg-orange-50/10 backdrop-blur-sm flex items-center justify-center relative"
          animate={{ boxShadow: ["0 0 20px rgba(255,107,0,0.1)", "0 0 40px rgba(255,107,0,0.3)", "0 0 20px rgba(255,107,0,0.1)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-24 h-24 rounded-full border border-orange-500/40 flex items-center justify-center">
            <Zap className="text-[#FF6B00] w-8 h-8 fill-orange-500/10" />
          </div>
          {/* Scanning line effect */}
          <motion.div 
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-50"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Right: Clarity (Signal) */}
      <div className="absolute right-0 w-1/3 h-full flex items-center pl-8">
        <div className="relative w-full max-w-[200px] h-[160px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-0 top-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex items-start gap-3"
              style={{ zIndex: 3 - i }}
              initial={{ x: -50, opacity: 0, scale: 0.9, y: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1, 
                scale: 1 - i * 0.05, 
                y: i * 15 
              }}
              transition={{ 
                duration: 0.8, 
                delay: 2 + i * 0.5,
                repeat: Infinity,
                repeatDelay: 4
              }}
            >
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="text-[#FF6B00]" />
              </div>
              <div className="space-y-2 w-full">
                <div className="h-2 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-2 w-1/2 bg-gray-100 rounded" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Hero Section
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.1] text-[#1A1A1A] mb-8 tracking-tight">
          Your Team's Collective Flow, <br />
          <span className="italic text-[#FF6B00]">Uninterrupted.</span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          While Agents handle your SaaS tools to{' '}
          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="relative z-10 px-2 py-0.5 text-[#1A1A1A] font-medium">
              filter out the 99% noise
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-orange-200/40 via-yellow-100/50 to-orange-200/40 rounded-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
            />
          </motion.span>
          <br />
          Your team converges in the Workspace to act on the 1% signal<br />
          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="relative z-10 px-2 py-0.5 text-[#1A1A1A] font-medium">
              Let info flows. Get in flow.
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-orange-200/40 via-yellow-100/50 to-orange-200/40 rounded-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
            />
          </motion.span>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={() => navigate('/app/dashboard')}
            className="group relative px-8 py-4 bg-[#1A1A1A] text-white rounded-lg font-medium overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              Start Your Brief <ArrowRight size={18} />
            </span>
          </button>
          
          <button className="flex items-center gap-2 px-8 py-4 text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-colors font-medium">
            <Play size={18} className="fill-current" /> Watch the Film
          </button>
        </div>

        <HeroFilterAnimation />
      </motion.div>
    </section>
  );
};

// Problem Section
const Problem = () => {
  return (
    <section className="py-24 bg-[#F5F5F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1A1A1A]">
            Drowning in Tabs. <br/>
            <span className="text-gray-400 italic">Starving for Context.</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            The average enterprise uses 80+ SaaS tools. Your engineers and sales reps spend their days ferrying data between browser tabs instead of doing the work that matters.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-[#F5F5F0]" />
              ))}
            </div>
            <span>Teams waste 40% of their day switching contexts.</span>
          </div>
        </motion.div>

        {/* Visual: The Mess */}
        <motion.div 
          className="relative h-[400px] w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <motion.div
              key={index}
              className="absolute bg-white border border-gray-300 shadow-xl rounded-lg overflow-hidden"
              style={{
                width: '60%',
                height: '200px',
                left: `${index * 10}%`,
                top: `${index * 12}%`,
                zIndex: index,
                opacity: 0.5 + (index * 0.1)
              }}
              whileHover={{ scale: 1.05, zIndex: 10, opacity: 1 }}
            >
              {/* Fake UI Header */}
              <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-2 gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              {/* Fake UI Content */}
              <div className="p-4 space-y-3 grayscale opacity-60">
                <div className="h-2 w-1/3 bg-gray-200 rounded" />
                <div className="h-2 w-3/4 bg-gray-200 rounded" />
                <div className="h-2 w-1/2 bg-gray-200 rounded" />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="h-16 bg-gray-100 rounded" />
                  <div className="h-16 bg-gray-100 rounded" />
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gray-900 rounded-full blur-[100px] opacity-10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

// Solution Section (Scroll-telling)
interface SolutionStepProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: boolean;
  onClick: () => void;
}

const SolutionStep: React.FC<SolutionStepProps> = ({ title, subtitle, icon: Icon, isActive, onClick }) => (
  <motion.div 
    onClick={onClick}
    className={`cursor-pointer p-6 rounded-xl border-l-4 transition-all duration-500 mb-8 ${isActive ? 'border-[#FF6B00] bg-white shadow-lg' : 'border-gray-200 hover:border-gray-300 opacity-60'}`}
  >
    <div className="flex items-center gap-4 mb-2">
      <div className={`p-2 rounded-lg ${isActive ? 'bg-orange-100 text-[#FF6B00]' : 'bg-gray-100 text-gray-500'}`}>
        <Icon size={24} />
      </div>
      <h3 className={`font-serif text-2xl ${isActive ? 'text-[#1A1A1A]' : 'text-gray-500'}`}>{title}</h3>
    </div>
    <p className={`text-lg ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>{subtitle}</p>
  </motion.div>
);

interface SolutionPreviewProps {
  step: number;
}

const SolutionPreview: React.FC<SolutionPreviewProps> = ({ step }) => {
  return (
    <div className="relative w-full h-[500px] bg-[#1A1A1A] rounded-2xl shadow-2xl overflow-hidden border border-gray-800 p-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full flex flex-col"
          >
             <div className="text-white/50 text-xs tracking-widest uppercase mb-4">Integrations</div>
             <div className="grid grid-cols-2 gap-4">
               {['Salesforce', 'HubSpot', 'Linear', 'GitHub', 'Slack', 'Notion'].map((tool, i) => (
                 <motion.div 
                    key={tool}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-white/10"
                 >
                   <span className="text-white font-medium">{tool} Agent</span>
                   <div className="w-4 h-4 rounded border border-white/30 group-hover:bg-[#FF6B00] group-hover:border-[#FF6B00] transition-colors" />
                 </motion.div>
               ))}
             </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full h-full relative"
          >
             <div className="text-white/50 text-xs tracking-widest uppercase mb-4">Morning Brief • Oct 24</div>
             <div className="space-y-4">
               <div className="bg-gradient-to-r from-orange-500/20 to-transparent border-l-2 border-[#FF6B00] p-4 rounded-r-lg">
                 <h4 className="text-white font-serif text-lg">High Priority: Q4 Contract Risk</h4>
                 <p className="text-white/60 text-sm mt-1">3 key accounts showing low usage signals in Amplitude.</p>
               </div>
               <div className="bg-white/5 p-4 rounded-lg">
                 <h4 className="text-white font-serif text-lg">Engineering Health</h4>
                 <p className="text-white/60 text-sm mt-1">Deploy success rate up 98%. 2 critical Sentry alerts.</p>
               </div>
               <div className="bg-white/5 p-4 rounded-lg flex gap-4">
                  <div className="h-20 w-1/3 bg-white/5 rounded animate-pulse"></div>
                  <div className="h-20 w-1/3 bg-white/5 rounded animate-pulse"></div>
                  <div className="h-20 w-1/3 bg-white/5 rounded animate-pulse"></div>
               </div>
             </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="w-full h-full bg-white text-black p-6 rounded-lg shadow-xl overflow-hidden relative"
          >
             <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="font-serif text-2xl font-bold">Acme Corp Renewals Strategy</h3>
                <span className="bg-orange-100 text-[#FF6B00] px-3 py-1 rounded-full text-xs font-bold uppercase">Drafted by Inflow</span>
             </div>
             <div className="space-y-4 font-serif text-gray-800">
               <p>Based on the recent usage drop in the <strong>Analytics Module</strong> (source: Amplitude) and the open support ticket regarding <strong>API Latency</strong> (source: Intercom)...</p>
               <p>We recommend proposing a dedicated <strong>Solution Engineering</strong> session to address the latency...</p>
               
               <div className="bg-gray-50 p-4 rounded border border-gray-100 mt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wide mb-2">
                    <Github size={12} /> Source Context
                  </div>
                  <div className="text-sm font-mono text-gray-600">Issue #402: API Latency on /v2/query endpoint (Open)</div>
               </div>
             </div>
             
             <motion.div 
               className="absolute bottom-6 right-6"
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.5, type: "spring" }}
             >
                <button className="bg-[#1A1A1A] text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
                  <Zap size={14} className="text-[#FF6B00]" /> Act Now
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Solution = () => {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Auto-switch steps if user doesn't interact, or strictly via scroll if using real scroll-telling
  // For this demo, we'll make it clickable but "sticky" layout compatible
  
  return (
    <section ref={containerRef} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#FF6B00] font-medium tracking-widest uppercase text-sm">The Workflow</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 text-[#1A1A1A]">Look, Think, Act.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Left: Steps */}
          <div className="flex flex-col justify-center">
             <SolutionStep 
               title="Hire Your Agents" 
               subtitle="You hire Agents, not tools. Connect your entire stack in minutes."
               icon={Users}
               isActive={activeStep === 1}
               onClick={() => setActiveStep(1)}
             />
             <SolutionStep 
               title="The Morning Brief" 
               subtitle="The only tab you need to open. 99% noise filtered into high-signal bento cards."
               icon={FileText}
               isActive={activeStep === 2}
               onClick={() => setActiveStep(2)}
             />
             <SolutionStep 
               title="Deep Dive Workbench" 
               subtitle="From signal to story. Click a card to enter a distraction-free writing studio with full context."
               icon={Zap}
               isActive={activeStep === 3}
               onClick={() => setActiveStep(3)}
             />
          </div>

          {/* Right: Sticky Visual */}
          <div className="h-[600px] lg:h-auto relative">
             <div className="sticky top-24">
                <SolutionPreview step={activeStep} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Use Cases Section
const UseCases = () => {
  const [activeTab, setActiveTab] = useState('eng');

  interface UseCase {
    title: string;
    scenario: string;
    stat: string;
    desc: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
  }

  const content: Record<string, UseCase> = {
    eng: {
      title: "Engineering Leadership",
      scenario: "GitHub PR Backlog + Sentry Alerts → Performance Brief",
      stat: "Latency reduced by 30ms",
      desc: "Inflow noticed a spike in database errors correlating with the new payment gateway deployment. It drafted a rollback plan for approval.",
      icon: Code2,
      color: "bg-blue-50 text-blue-600"
    },
    sales: {
      title: "Enterprise Sales",
      scenario: "HubSpot Leads + Gmail Threads → Deal Intelligence",
      stat: "ARR +$50k secured",
      desc: "Inflow detected a champion at Acme Corp moved to a new role. It drafted a congratulatory email with a contextual upsell pitch.",
      icon: BarChart3,
      color: "bg-green-50 text-green-600"
    },
    founder: {
      title: "Founder Mode",
      scenario: "Stripe Revenue + Intercom Complaints → Churn Risk",
      stat: "Saved 3 Key Accounts",
      desc: "Inflow correlated a drop in MRR with a specific feature bug reported in support, flagging it as a 'Red Alert' before the weekly all-hands.",
      icon: ShieldAlert,
      color: "bg-purple-50 text-purple-600"
    }
  };

  const ActiveContent = content[activeTab];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
           <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">Built for the <span className="italic text-[#FF6B00]">signal-seekers</span>.</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 border-b border-gray-100">
          {Object.keys(content).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-8 py-4 font-medium text-sm md:text-base transition-all relative ${
                activeTab === key ? 'text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {content[key].title}
              {activeTab === key && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-1 bg-[#FF6B00]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#FAFAFA] rounded-2xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="flex-1 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${ActiveContent.color}`}>
              <ActiveContent.icon size={14} /> {activeTab} Use Case
            </div>
            <h3 className="text-2xl font-serif text-[#1A1A1A]">{ActiveContent.scenario}</h3>
            <p className="text-gray-600 leading-relaxed">{ActiveContent.desc}</p>
          </div>

          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FF6B00]">
                 <Zap size={20} />
               </div>
               <div>
                 <div className="text-xs text-gray-400 uppercase">Outcome</div>
                 <div className="font-bold text-[#1A1A1A]">{ActiveContent.stat}</div>
               </div>
             </div>
             <div className="h-2 w-full bg-gray-100 rounded mb-2 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '80%' }}
                 transition={{ delay: 0.2, duration: 1 }}
                 className="h-full bg-[#FF6B00]" 
               />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#111111] text-white py-24 px-6 text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="font-serif text-4xl md:text-6xl mb-8">
          Stop monitoring. <br />
          <span className="text-gray-500 italic">Start flowing.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-16">
          <input 
            type="email" 
            placeholder="Enter your work email..." 
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
          />
          <button 
            onClick={() => navigate('/app/dashboard')}
            className="bg-[#FF6B00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#ff8533] transition-colors"
          >
            Get Early Access
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 opacity-50 text-sm">
          <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
          <span>Inflow Inc. © 2025</span>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#FF6B00]/10 to-transparent pointer-events-none" />
    </footer>
  );
};

// Main App
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <FontLoader />
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-panel px-6 py-4 flex justify-between items-center transition-all duration-300">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 font-serif text-xl font-bold text-[#1A1A1A] hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Inflow" className="w-8 h-8" />
          Inflow
        </button>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-[#1A1A1A]">Manifesto</a>
          <a href="#" className="hover:text-[#1A1A1A]">Pricing</a>
          <a href="#" className="hover:text-[#1A1A1A]">Login</a>
        </div>
        <button 
          onClick={() => navigate('/app/dashboard')}
          className="bg-[#1A1A1A] text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Request Access
        </button>
      </nav>

      <main>
        <Hero />
        <Problem />
        <Solution />
        <UseCases />
      </main>
      
      <Footer />
    </div>
  );
}
