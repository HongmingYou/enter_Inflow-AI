import { Activity, Quote } from 'lucide-react';

export const CelebrationArt = () => (
  <div className="absolute inset-0 overflow-hidden bg-white">
    <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,_rgba(255,200,220,0.6),_transparent_60%)] animate-spin-slow" />
    <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_80%_20%,_rgba(200,220,255,0.6),_transparent_50%)] animate-spin-slow-reverse" />
    <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
  </div>
);

export const TechnicalArt = () => (
  <div className="absolute inset-0 bg-slate-50 overflow-hidden font-mono text-[10px] leading-3 text-slate-400 p-4 select-none">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(51,65,85,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(51,65,85,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
    <div className="opacity-60">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="whitespace-nowrap">
          {`0x${Math.random().toString(16).slice(2, 6)} SYNC_NODE_${Math.floor(Math.random() * 99)} [OK]`}
        </div>
      ))}
    </div>
    <div className="absolute bottom-6 right-6">
      <Activity className="w-8 h-8 text-slate-400 animate-pulse" />
    </div>
  </div>
);

export const VoiceArt = () => (
  <div className="absolute inset-0 bg-[#FFD700] overflow-hidden flex flex-col justify-between p-6">
    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
    <Quote className="w-12 h-12 text-black/10 fill-current" />
    <div className="absolute -right-6 -bottom-12 w-32 h-64 bg-white/20 -rotate-12 backdrop-blur-sm" />
  </div>
);

export const IntelligenceArt = () => (
  <div className="absolute inset-0 bg-[#F5F5F0] overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100%_24px]" />
    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />
    <div className="absolute bottom-6 left-6 border border-orange-800/20 bg-orange-50/50 px-2 py-1 rounded text-[10px] text-orange-800/60 font-mono tracking-widest uppercase">
      Confidential
    </div>
  </div>
);

export const getCardArt = (type: string) => {
  switch (type) {
    case 'celebration':
      return <CelebrationArt />;
    case 'technical':
      return <TechnicalArt />;
    case 'voice':
      return <VoiceArt />;
    case 'intelligence':
      return <IntelligenceArt />;
    default:
      return <CelebrationArt />;
  }
};
