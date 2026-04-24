import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ClientNav from './ClientNav';
import OwnerNav from './OwnerNav';
import { useAuth } from '@/lib/AuthContext';

const SUB_PAGE_PREFIXES = ['/barbearia/'];

export default function AppLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const isSubPage = SUB_PAGE_PREFIXES.some(p => location.pathname.startsWith(p));
  const isOwner = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-background font-body">
      <main className={`max-w-lg mx-auto ${isSubPage ? '' : 'pb-safe-nav'}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ x: isSubPage ? '100%' : '-20px', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isSubPage ? '100%' : '-20px', opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {isOwner ? <OwnerNav /> : <ClientNav />}
    </div>
  );
}