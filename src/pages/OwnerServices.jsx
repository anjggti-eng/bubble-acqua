const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';

import { useAuth } from '@/lib/AuthContext';
import { useQuery } from '@tanstack/react-query';
import ServiceManager from '@/components/shop/ServiceManager';

export default function OwnerServices() {
  const { user } = useAuth();

  const { data: shops = [], isLoading } = useQuery({
    queryKey: ['my-shop', user?.email],
    queryFn: () => db.entities.Barbershop.filter({ owner_email: user?.email }),
    enabled: !!user?.email,
  });

  const shop = shops[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="font-heading text-2xl font-bold mb-6">Meus Serviços</h1>
      {!shop ? (
        <p className="text-muted-foreground text-center py-12">Cadastre sua barbearia primeiro.</p>
      ) : (
        <ServiceManager shopId={shop.id} />
      )}
    </div>
  );
}