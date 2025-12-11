import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FloatingDock } from '@/components/navigation/FloatingDock';

export function MainLayout() {
  const location = useLocation();
  // Studio 页面路径模式：/app/workspace/:workspaceId
  const isStudioPage = /^\/app\/workspace\/[^/]+$/.test(location.pathname);
  
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900">
      {/* Noise Overlay - Global */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Floating Dock Navigation - 只在非 Studio 页面显示 */}
      {!isStudioPage && <FloatingDock />}
      
      {/* Main Content Area */}
      <div className={!isStudioPage ? "pl-16 sm:pl-20 md:pl-24" : ""}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
