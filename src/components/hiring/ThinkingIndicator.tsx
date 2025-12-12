import { motion } from 'framer-motion';
import type { ThinkingIndicatorProps } from './types';

export function ThinkingIndicator({ className = '' }: ThinkingIndicatorProps) {
  return (
    <div className={`flex items-center gap-2 py-3 ${className}`}>
      <div className="relative overflow-hidden w-20 h-1 bg-stone-100 rounded-full">
        <motion.div
          className="absolute h-full w-8 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"
          animate={{ x: [-32, 80] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          }}
        />
      </div>
      <span className="text-xs text-stone-400 font-medium">Thinking...</span>
    </div>
  );
}
