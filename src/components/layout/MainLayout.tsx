import { Outlet } from 'react-router-dom';
import { FloatingDock } from '@/components/navigation/FloatingDock';
import { AnimatePresence, motion } from 'framer-motion';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Noise Overlay - Global */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Floating Dock Navigation */}
      <FloatingDock />
      
      {/* Main Content Area */}
      <div className="pl-32">
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
