import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function GalleryGrid({ photos }) {
  const [selected, setSelected] = useState(null);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhuma foto na galeria ainda
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelected(photo)}
          >
            <img
              src={photo.image_url}
              alt={photo.title || 'Corte'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
            {photo.category && (
              <Badge className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px]">
                {photo.category}
              </Badge>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md p-0 bg-card border-border overflow-hidden">
          {selected && (
            <div>
              <img
                src={selected.image_url}
                alt={selected.title || 'Corte'}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                {selected.title && (
                  <h3 className="font-heading text-lg font-semibold">{selected.title}</h3>
                )}
                {selected.category && (
                  <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">
                    {selected.category}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}