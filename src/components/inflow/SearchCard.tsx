import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

interface SearchCardProps {
  onClick: () => void;
  isActive?: boolean;
}

export function SearchCard({ onClick, isActive = false }: SearchCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        group relative w-full h-full
        rounded-xl overflow-hidden cursor-pointer border-2
        transition-all duration-300
        ${isActive 
          ? 'border-orange-400 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 shadow-xl shadow-orange-200/50' 
          : 'border-stone-200 bg-gradient-to-br from-stone-50 via-white to-stone-50 hover:border-orange-300 hover:shadow-lg'
        }
      `}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.1),transparent_50%)]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex items-center justify-between">
        {/* Left side - Icon and text */}
        <div className="flex items-center gap-4 flex-1">
          {/* Icon container with glow effect */}
          <motion.div
            className={`
              relative p-3 rounded-xl
              ${isActive 
                ? 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-300/50' 
                : 'bg-gradient-to-br from-stone-200 to-stone-300 group-hover:from-orange-200 group-hover:to-amber-200'
              }
            `}
            animate={isActive ? {
              boxShadow: [
                '0 0 20px rgba(255, 107, 0, 0.4)',
                '0 0 30px rgba(255, 107, 0, 0.6)',
                '0 0 20px rgba(255, 107, 0, 0.4)',
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Search 
              size={24} 
              className={isActive ? 'text-white' : 'text-stone-600 group-hover:text-orange-600'} 
            />
            {isActive && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={16} className="text-orange-500" />
              </motion.div>
            )}
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className={`
                font-bold text-lg tracking-tight
                ${isActive ? 'text-orange-900' : 'text-stone-900 group-hover:text-orange-900'}
              `}>
                想找什么？我来帮你
              </h3>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs px-2 py-0.5 rounded-full bg-orange-200 text-orange-800 font-medium"
                >
                  激活中
                </motion.span>
              )}
            </div>
            <p className={`
              text-sm
              ${isActive ? 'text-orange-700' : 'text-stone-500 group-hover:text-stone-700'}
            `}>
              {isActive ? '正在搜索...' : '快速查找dashboard内的信息'}
            </p>
          </div>
        </div>

        {/* Right side - Decorative elements */}
        <div className="flex items-center gap-2 opacity-60">
          <motion.div
            className="w-2 h-2 rounded-full bg-orange-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-amber-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-yellow-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      </div>

      {/* Hover effect overlay */}
      {!isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      )}
    </motion.div>
  );
}
