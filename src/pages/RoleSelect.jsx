const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, User } from 'lucide-react';

export default function RoleSelect({ onDone }) {
  const [loading, setLoading] = useState(null);

  const choose = async (role) => {
    setLoading(role);
    await db.auth.updateMe({ role, onboarded: true });
    onDone();
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center px-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Scissors className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">BarberApp</h1>
          <p className="text-muted-foreground mt-2 text-sm">Como você vai usar o app?</p>
        </div>

        {/* Cards de escolha */}
        <div className="space-y-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => choose('user')}
            disabled={!!loading}
            className="w-full bg-card border-2 border-border hover:border-primary/50 rounded-2xl p-6 text-left transition-all active:scale-[0.97] disabled:opacity-60"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-semibold">Sou Cliente</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Quero encontrar e agendar em barbearias</p>
              </div>
              {loading === 'user' && (
                <div className="ml-auto w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
              )}
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => choose('admin')}
            disabled={!!loading}
            className="w-full bg-card border-2 border-primary/30 hover:border-primary rounded-2xl p-6 text-left transition-all active:scale-[0.97] disabled:opacity-60"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Scissors className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-semibold text-primary">Sou Dono de Barbearia</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Quero gerenciar minha barbearia e receber clientes</p>
              </div>
              {loading === 'admin' && (
                <div className="ml-auto w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
              )}
            </div>
          </motion.button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Você pode mudar isso depois no seu perfil.
        </p>
      </motion.div>
    </div>
  );
}