import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BarbershopCard({ shop, distance }) {
  return (
    <Link to={`/barbearia/${shop.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 group-hover:border-primary/40">
        <div className="relative h-40 overflow-hidden">
          <img
            src={shop.cover_image || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=300&fit=crop'}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {distance && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium">
              <MapPin className="w-3 h-3 mr-1" />
              {distance} km
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold text-foreground truncate">{shop.name}</h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{shop.address}</span>
          </div>
          {shop.opening_hour && shop.closing_hour && (
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{shop.opening_hour} - {shop.closing_hour}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}