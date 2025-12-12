import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { OfferLetterProps } from './types';

const scopeLabels = {
  observer: 'Observer',
  reviewer: 'Reviewer',
  gatekeeper: 'Gatekeeper',
};

const frequencyLabels = {
  realtime: 'Real-time',
  hourly: 'Hourly',
  daily: 'Daily',
  weekly: 'Weekly',
};

export function OfferLetter({ agent, config, onSign, isSigned }: OfferLetterProps) {
  const Icon = agent.icon;
  
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-stone-200 p-6 shadow-lg relative overflow-hidden"
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
        
        {/* Header */}
        <div className="text-center mb-6 relative">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200">
              <Icon size={32} className="text-orange-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-stone-900">Offer Letter</h3>
          <p className="text-stone-500 text-sm mt-1">Agent Onboarding Agreement</p>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm relative">
          <div className="flex justify-between py-2 border-b border-stone-100">
            <span className="text-stone-500">Agent Name</span>
            <span className="font-medium text-stone-900">{agent.displayName}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-stone-100">
            <span className="text-stone-500">Access Level</span>
            <span className="font-medium text-stone-900">{scopeLabels[config.scopeLevel]}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-stone-100">
            <span className="text-stone-500">Repositories</span>
            <span className="font-medium text-stone-900">{config.selectedRepositories.length} selected</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-stone-100">
            <span className="text-stone-500">Notifications</span>
            <span className="font-medium text-stone-900">{frequencyLabels[config.notificationFrequency]}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-stone-100">
            <span className="text-stone-500">Slack Integration</span>
            <span className="font-medium text-stone-900">
              {config.slackConnected ? 'Connected' : 'Not connected'}
            </span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-stone-500">Monthly Rate</span>
            <span className="font-bold text-orange-600">{agent.price}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 p-3 bg-stone-50 rounded-lg text-xs text-stone-500 relative">
          <p>
            By signing this offer, you authorize {agent.displayName} to access the selected 
            repositories with {scopeLabels[config.scopeLevel].toLowerCase()} permissions. 
            You can modify these settings or dismiss the agent at any time.
          </p>
        </div>

        {/* Sign Button / Signed State */}
        <div className="mt-6 relative">
          {!isSigned ? (
            <Button 
              onClick={onSign}
              className="w-full bg-orange-500 hover:bg-orange-600 py-6 text-lg font-semibold"
            >
              <FileText size={20} className="mr-2" />
              Sign & Onboard
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4 text-green-600">
              <CheckCircle2 size={20} />
              <span className="font-medium">Signed & Onboarded</span>
            </div>
          )}
        </div>

        {/* HIRED Stamp Animation */}
        <AnimatePresence>
          {isSigned && (
            <motion.div
              initial={{ opacity: 0, scale: 2, rotate: -30, y: -100 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: -15, 
                y: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="relative">
                {/* Stamp background */}
                <div className="w-40 h-24 border-4 border-green-600 rounded-lg flex items-center justify-center bg-white/90">
                  <span className="text-3xl font-bold text-green-600 tracking-wider">
                    HIRED
                  </span>
                </div>
                {/* Date */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-green-600 font-mono">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Paper shake effect when stamp lands */}
      {isSigned && (
        <motion.div
          initial={{ x: 0 }}
          animate={{ 
            x: [0, -3, 3, -2, 2, 0],
          }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="absolute inset-0 pointer-events-none"
        />
      )}
    </div>
  );
}
