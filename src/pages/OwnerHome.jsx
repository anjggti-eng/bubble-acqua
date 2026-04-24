const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useAuth } from '@/lib/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Scissors, Image, Calendar, LayoutDashboard, Tag, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShopForm from '@/components/shop/ShopForm';
import ServiceManager from '@/components/shop/ServiceManager';
import GalleryManager from '@/components/shop/GalleryManager';
import ShopAppointments from '@/components/shop/ShopAppointments';
import OwnerDashboard from '@/components/shop/OwnerDashboard';
import CouponManager from '@/components/shop/CouponManager';

export default function OwnerHome() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('dashboard');

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

  if (!shop) {
    return (
      <div className="px-4 pt-6">
        <h1 className="font-heading text-2xl font-bold mb-2">Minha Barbearia</h1>
        <p className="text-muted-foreground text-sm mb-6">Cadastre sua barbearia para começar a receber agendamentos.</p>
        <ShopForm
          shop={null}
          onSaved={() => queryClient.invalidateQueries({ queryKey: ['my-shop'] })}
        />
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold">{shop.name}</h1>
        <p className="text-sm text-muted-foreground">{shop.address}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-secondary grid grid-cols-6 mb-4">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-1">
            <LayoutDashboard className="w-3.5 h-3.5" />
          </TabsTrigger>
          <TabsTrigger value="appointments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-1">
            <Calendar className="w-3.5 h-3.5" />
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-1">
            <Scissors className="w-3.5 h-3.5" />
          </TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-1">
            <Image className="w-3.5 h-3.5" />
          </TabsTrigger>
          <TabsTrigger value="coupons" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-1">
            <Tag className="w-3.5 h-3.5" />
          </TabsTrigger>
          <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-1">
            <Store className="w-3.5 h-3.5" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <OwnerDashboard shopId={shop.id} />
        </TabsContent>
        <TabsContent value="appointments">
          {activeTab !== 'dashboard' && (
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('dashboard')} className="mb-3 -ml-1 text-muted-foreground">
              <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
            </Button>
          )}
          <ShopAppointments shopId={shop.id} />
        </TabsContent>
        <TabsContent value="services">
          <Button variant="ghost" size="sm" onClick={() => setActiveTab('dashboard')} className="mb-3 -ml-1 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          <ServiceManager shopId={shop.id} />
        </TabsContent>
        <TabsContent value="gallery">
          <Button variant="ghost" size="sm" onClick={() => setActiveTab('dashboard')} className="mb-3 -ml-1 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          <GalleryManager shopId={shop.id} />
        </TabsContent>
        <TabsContent value="coupons">
          <Button variant="ghost" size="sm" onClick={() => setActiveTab('dashboard')} className="mb-3 -ml-1 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          <CouponManager shop={shop} />
        </TabsContent>
        <TabsContent value="info">
          <Button variant="ghost" size="sm" onClick={() => setActiveTab('dashboard')} className="mb-3 -ml-1 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          <ShopForm
            shop={shop}
            onSaved={() => queryClient.invalidateQueries({ queryKey: ['my-shop'] })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}