import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeProfile } from './ResumeProfile';
import { InterviewFlow } from './InterviewFlow';
import type { InterviewRoomProps, InterviewConfig } from './types';

export function InterviewRoom({ agent, isOpen, onClose, onHire }: InterviewRoomProps) {
  const handleComplete = (config: InterviewConfig) => {
    console.log('Interview completed with config:', config);
    onHire(agent.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[70] flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-full max-w-6xl max-h-[90vh] bg-[#FAFAF9] rounded-2xl shadow-2xl overflow-y-auto flex flex-col pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <agent.icon size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-stone-900">Interview with {agent.displayName}</h2>
                    <p className="text-sm text-stone-500">Get to know your potential hire</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-stone-100"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Split View */}
              <div className="flex-1 flex overflow-visible">
                {/* Left: Resume Profile (30%) */}
                <div className="w-[30%] border-r border-stone-200 hidden md:block">
                  <ResumeProfile agent={agent} />
                </div>

                {/* Right: Conversation (70%) */}
                <div className="flex-1 md:w-[70%] flex flex-col bg-white">
                  <InterviewFlow 
                    agent={agent}
                    onComplete={handleComplete}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
