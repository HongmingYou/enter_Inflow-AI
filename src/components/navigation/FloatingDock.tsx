import { motion } from 'framer-motion';
import { Home, Sparkles, Bot, Bell, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  isSpecial?: boolean;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: '首页',
    icon: Home,
    path: '/dashboard',
  },
  {
    id: 'workbench',
    label: '工作台',
    icon: Sparkles,
    path: '/workbench',
  },
  {
    id: 'agents',
    label: '雇佣 Agent',
    icon: Bot,
    path: '/agents',
    isSpecial: true,
  },
];

export function FloatingDock() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed left-3 sm:left-5 md:left-8 top-6 bottom-6 flex items-center z-50">
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-[72px] flex flex-col items-center py-6 bg-white/60 backdrop-blur-xl border border-white/30 rounded-[24px] shadow-xl shadow-orange-500/5">
            {/* Top - Brand Logo */}
            <div className="flex flex-col items-center mb-6">
              <Link to="/dashboard" className="group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  {/* Refined Logo: Simple brand graphic */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-orange-500"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </Link>
            </div>

            {/* Middle - Core Navigation */}
            <div className="flex flex-col items-center gap-3 w-full px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Link to={item.path} className="w-full flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            relative group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200
                            ${active ? 'bg-gray-100/50' : 'hover:bg-gray-50/50'}
                          `}
                        >
                          <Icon 
                            size={24} 
                            className={`
                              transition-colors duration-200
                              ${active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}
                              ${item.isSpecial && !active ? 'text-orange-500/80 drop-shadow-sm' : ''}
                            `}
                          />
                          {/* Special Glow for Hire Agent if desired */}
                          {item.isSpecial && (
                            <div className="absolute inset-0 bg-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </motion.div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      sideOffset={16}
                      className="bg-black text-white border-none text-xs px-3 py-1.5 shadow-xl"
                    >
                      {item.label}
                      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-black" />
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            {/* Spacer - Separator between Core and Utilities */}
            <div className="h-24 w-full" />

            {/* Bottom - Utilities & User */}
            <div className="flex flex-col items-center gap-3 w-full px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 transition-all relative"
                  >
                    <Bell size={22} />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  sideOffset={16}
                  className="bg-black text-white border-none text-xs px-3 py-1.5 shadow-xl"
                >
                  通知
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-black" />
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 transition-all"
                  >
                    <Settings size={22} />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  sideOffset={16}
                  className="bg-black text-white border-none text-xs px-3 py-1.5 shadow-xl"
                >
                  设置
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-black" />
                </TooltipContent>
              </Tooltip>

              <div className="w-8 h-px bg-gray-200/50 my-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1"
                  >
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700">
                        JY
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  sideOffset={16}
                  className="bg-black text-white border-none text-xs px-3 py-1.5 shadow-xl"
                >
                  个人资料
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-black" />
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </motion.nav>
      </div>
    </TooltipProvider>
  );
}
