const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';

import { useAuth } from '@/lib/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Scissors, Image, Calendar } from 'lucide-react';
import ShopForm from '@/components/shop/ShopForm';
import ServiceManager from '@/components/shop/ServiceManager';
import GalleryManager from '@/components/shop/GalleryManager';
import ShopAppointments from '@/components/shop/ShopAppointments';

export default function MyShop() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: shops = [], isLoading } = useQuery({
    queryKey: ['my-shop', user?.email],
    queryFn: () => db.entities.Barbershop.filter({ owner_email: user?.email }),
    enabled: !!user?.email,
  });

  const shop = shops[0] || null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="font-heading text-2xl font-bold mb-6">
        {shop ? 'Minha Barbearia' : 'Cadastrar Barbearia'}
      </h1>

      {!shop ? (
        <ShopForm
          shop={null}
          onSaved={() => queryClient.invalidateQueries({ queryKey: ['my-shop'] })}
        />
      ) : (
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full bg-secondary grid grid-cols-4">
            <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
              <Store className="w-3.5 h-3.5 mr-1" /> Info
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
              <Scissors className="w-3.5 h-3.5 mr-1" /> Serviços
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
              <Image className="w-3.5 h-3.5 mr-1" /> Galeria
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
              <Calendar className="w-3.5 h-3.5 mr-1" /> Agenda
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4">
            <ShopForm
              shop={shop}
              onSaved={() => queryClient.invalidateQueries({ queryKey: ['my-shop'] })}
            />
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <ServiceManager shopId={shop.id} />
          </TabsContent>

          <TabsContent value="gallery" className="mt-4">
            <GalleryManager shopId={shop.id} />
          </TabsContent>

          <TabsContent value="appointments" className="mt-4">
            <ShopAppointments shopId={shop.id} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}