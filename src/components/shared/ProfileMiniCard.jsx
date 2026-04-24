import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileMiniCard() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/perfil">
        <div className="flex items-center gap-3 p-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl active:scale-[0.98] transition-transform">
          {user.profile_photo ? (
            <img src={user.profile_photo} alt="" className="w-10 h-10 rounded-full object-cover border border-primary/20" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.full_name || 'Meu Perfil'}</p>
            <p className="text-xs text-muted-foreground">{user.role === 'admin' ? '✂️ Dono de Barbearia' : '👤 Cliente'}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        </div>
      </Link>
    </motion.div>
  );
}