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
    path: '/app/dashboard',
  },
  {
    id: 'workspace',
    label: '工作台',
    icon: Sparkles,
    path: '/app/workspace',
  },
  {
    id: 'agents',
    label: '雇佣 Agent',
    icon: Bot,
    path: '/app/agents',
    isSpecial: true,
  },
];

export function FloatingDock() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/app/dashboard') {
      return location.pathname === '/app' || location.pathname === '/app/dashboard';
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
          <div className="w-[72px] h-full flex flex-col items-center py-4 bg-white/70 backdrop-blur-xl border border-white/40 rounded-[20px] shadow-xl shadow-orange-500/5">
            {/* Top - Brand Logo */}
            <div className="flex flex-col items-center mb-4">
              <Link to="/app/dashboard" className="group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <img 
                    src="/logo.png" 
                    alt="InFlow" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Middle - Core Navigation */}
            <div className="flex flex-col items-center w-full px-3 flex-1 justify-start gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Link to={item.path} className="w-full flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            relative group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200
                            ${active 
                              ? 'bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-sm shadow-orange-200/50' 
                              : 'hover:bg-gray-50/50'
                            }
                          `}
                        >
                          <Icon 
                            size={22} 
                            className={`
                              transition-colors duration-200
                              ${active ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}
                            `}
                          />
                          {/* Active indicator */}
                          {active && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full"
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
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

            {/* Bottom - Utilities & User */}
            <div className="flex flex-col items-center gap-3 w-full px-3 mt-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 transition-all relative"
                  >
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
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
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 transition-all"
                  >
                    <Settings size={20} />
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

              <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent my-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-0.5"
                  >
                    <Avatar className="h-9 w-9 border-2 border-orange-200 shadow-md hover:shadow-lg transition-shadow">
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
