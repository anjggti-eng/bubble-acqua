const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, MapPin, Navigation, Loader2 } from 'lucide-react';
import BarbershopCard from '@/components/shared/BarbershopCard';

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export default function Search() {
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const { data: shops = [], isLoading } = useQuery({
    queryKey: ['barbershops-all'],
    queryFn: () => db.entities.Barbershop.list('-created_date', 100),
  });

  const getLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoadingLocation(false);
      },
      () => setLoadingLocation(false),
      { enableHighAccuracy: true }
    );
  };

  const filteredShops = useMemo(() => {
    let result = shops;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.name?.toLowerCase().includes(q) || s.address?.toLowerCase().includes(q)
      );
    }
    if (userLocation) {
      result = result
        .map(s => ({
          ...s,
          distance: s.latitude && s.longitude
            ? getDistanceKm(userLocation.lat, userLocation.lng, s.latitude, s.longitude)
            : 999
        }))
        .sort((a, b) => a.distance - b.distance);
    }
    return result;
  }, [shops, search, userLocation]);

  return (
    <div className="px-4 pt-6">
      <h1 className="font-heading text-2xl font-bold mb-5">Buscar Barbearias</h1>

      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nome ou endereço..."
          className="pl-10 bg-secondary border-border h-12"
        />
      </div>

      <Button
        variant="outline"
        onClick={getLocation}
        disabled={loadingLocation}
        className="w-full mb-6 h-11 border-primary/30 text-primary hover:bg-primary/10"
      >
        {loadingLocation ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Navigation className="w-4 h-4 mr-2" />
        )}
        {userLocation ? 'Localização obtida ✓' : 'Usar minha localização'}
      </Button>

      {userLocation && (
        <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Ordenado por distância
        </p>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-52 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredShops.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <SearchIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p>Nenhuma barbearia encontrada</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredShops.map(shop => (
            <BarbershopCard
              key={shop.id}
              shop={shop}
              distance={shop.distance ? shop.distance.toFixed(1) : null}
            />
          ))}
        </div>
      )}
    </div>
  );
}