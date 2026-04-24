const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Scissors, Search, MapPin, ArrowRight, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BarbershopCard from '@/components/shared/BarbershopCard';
import ProfileMiniCard from '@/components/shared/ProfileMiniCard';

export default function Home() {
  const [search, setSearch] = useState('');

  const { data: shops = [], isLoading } = useQuery({
    queryKey: ['barbershops'],
    queryFn: () => db.entities.Barbershop.list('-created_date', 50),
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return shops.slice(0, 6);
    const q = search.toLowerCase();
    return shops.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.address?.toLowerCase().includes(q)
    );
  }, [shops, search]);

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scissors className="w-6 h-6 text-primary" />
            <span className="font-heading text-2xl font-bold text-primary">BarberApp</span>
          </div>
          <p className="text-sm text-muted-foreground">Encontre a melhor barbearia perto de você</p>
        </div>
      </div>

      {/* Profile mini card */}
      <div className="mb-5">
        <ProfileMiniCard />
      </div>

      {/* Promo banner */}
      {!search && (
        <Link to="/promocoes" className="flex items-center gap-3 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 mb-5 hover:bg-primary/15 transition">
          <Tag className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">Promoções & Cupons</p>
            <p className="text-xs text-muted-foreground">Veja ofertas das barbearias</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary" />
        </Link>
      )}

      {/* Search Bar — real, filtra na hora */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome ou cidade..."
          className="w-full pl-12 pr-10 py-3.5 bg-secondary rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hero Banner — só aparece quando não está filtrando */}
      {!search && (
        <div className="relative rounded-2xl overflow-hidden mb-6 h-44">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop"
            alt="Barbearia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <h2 className="font-heading text-xl font-bold text-white mb-1">Estilo & Tradição</h2>
            <p className="text-white/80 text-sm mb-3">Os melhores profissionais da sua região</p>
            <Link to="/buscar">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
                <MapPin className="w-4 h-4 mr-1.5" />
                Buscar Perto de Mim
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Shops List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold">
            {search ? `Resultados para "${search}"` : 'Barbearias em Destaque'}
          </h3>
          {!search && (
            <Link to="/buscar" className="text-primary text-sm font-medium flex items-center gap-1">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-52 bg-secondary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {search ? 'Nenhuma barbearia encontrada para essa busca.' : 'Nenhuma barbearia cadastrada ainda.'}
            </p>
            {!search && (
              <Link to="/minha-loja">
                <Button variant="outline" className="mt-4">
                  Cadastrar Minha Barbearia
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(shop => (
              <BarbershopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}