import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, User } from 'lucide-react';
import { usePendingCount } from '@/hooks/usePendingCount';

const navItems = [
  { path: '/', icon: Home, label: 'Início' },
  { path: '/buscar', icon: Search, label: 'Buscar' },
  { path: '/agendamentos', icon: Calendar, label: 'Agenda' },
  { path: '/perfil', icon: User, label: 'Perfil' },
];

const SUB_PAGE_PREFIXES = ['/barbearia/'];

export default function ClientNav() {
  const location = useLocation();
  const isSubPage = SUB_PAGE_PREFIXES.some(p => location.pathname.startsWith(p));
  const pendingCount = usePendingCount();

  if (isSubPage) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2 safe-bottom">
        {navItems.map(({ path, icon: Icon, label }) => {
          const showBadge = path === '/agendamentos' && pendingCount > 0;
          return (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 relative ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                    {showBadge && (
                      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                        {pendingCount > 9 ? '9+' : pendingCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium">{label}</span>
                  {isActive && <div className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}