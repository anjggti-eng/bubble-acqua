import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServiceCard({ service, onBook }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
      {service.image_url && (
        <img
          src={service.image_url}
          alt={service.name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">{service.name}</h4>
        {service.description && (
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{service.description}</p>
        )}
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-primary font-semibold">R$ {service.price?.toFixed(2)}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {service.duration_minutes} min
          </span>
        </div>
      </div>
      {onBook && (
        <Button
          size="sm"
          onClick={() => onBook(service)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
        >
          Agendar
        </Button>
      )}
    </div>
  );
}