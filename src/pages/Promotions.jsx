const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Tag, Copy, ChevronLeft, Search, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Promotions() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['all-coupons'],
    queryFn: () => db.entities.Coupon.filter({ active: true }, '-created_date', 100),
  });

  const filtered = coupons.filter(c => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.title?.toLowerCase().includes(q) ||
      c.barbershop_name?.toLowerCase().includes(q) ||
      c.code?.toLowerCase().includes(q);
  });

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({ title: `Código ${code} copiado!`, description: 'Use na hora de agendar.' });
  };

  const isExpired = (expires_at) => {
    if (!expires_at) return false;
    return new Date(expires_at) < new Date();
  };

  const active = filtered.filter(c => !isExpired(c.expires_at));

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link to="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold">Promoções</h1>
          <p className="text-sm text-muted-foreground">Cupons e ofertas das barbearias</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar promoção ou barbearia..."
          className="w-full pl-9 pr-9 py-3 bg-secondary rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-28 bg-secondary rounded-xl animate-pulse" />)}
        </div>
      ) : active.length === 0 ? (
        <div className="text-center py-16">
          <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground">Nenhuma promoção disponível no momento</p>
        </div>
      ) : (
        <div className="space-y-3">
          {active.map(c => (
            <div key={c.id} className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
              <div className="h-1 w-full bg-primary" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{c.barbershop_name}</p>
                    <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                    {c.description && <p className="text-xs text-muted-foreground mb-2">{c.description}</p>}
                    <p className="text-primary font-bold text-sm">
                      {c.discount_type === 'percent'
                        ? `${c.discount_value}% de desconto`
                        : `R$ ${Number(c.discount_value).toFixed(2)} de desconto`}
                    </p>
                    {c.expires_at && (
                      <p className="text-xs text-muted-foreground mt-1">Válido até {c.expires_at}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="bg-secondary border border-border rounded-lg px-3 py-2 text-center">
                      <p className="font-mono font-bold text-primary text-base tracking-widest">{c.code}</p>
                      <p className="text-xs text-muted-foreground">código</p>
                    </div>
                    <button
                      onClick={() => copyCode(c.code)}
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Copy className="w-3 h-3" /> Copiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}