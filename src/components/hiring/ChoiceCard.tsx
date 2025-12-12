import { motion } from 'framer-motion';
import type { ChoiceCardProps } from './types';

export function ChoiceCard({ title, description, icon, isSelected, onClick }: ChoiceCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full p-4 rounded-xl text-left transition-all duration-200
        border-2 
        ${isSelected 
          ? 'border-orange-500 bg-orange-50 shadow-md' 
          : 'border-stone-200 bg-white hover:border-orange-300 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className={`
            p-2 rounded-lg
            ${isSelected ? 'bg-orange-100 text-orange-600' : 'bg-stone-100 text-stone-500'}
          `}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4 className={`font-semibold ${isSelected ? 'text-orange-900' : 'text-stone-900'}`}>
            {title}
          </h4>
          <p className={`text-sm mt-1 ${isSelected ? 'text-orange-700' : 'text-stone-500'}`}>
            {description}
          </p>
        </div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.button>
  );
}
