const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import { MapPin, Phone, Clock, Scissors, Image, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard from '@/components/shared/ServiceCard';
import GalleryGrid from '@/components/shared/GalleryGrid';
import BookingModal from '@/components/booking/BookingModal';
import PageHeader from '@/components/shared/PageHeader';
import ReviewSection from '@/components/shared/ReviewSection';
import StarRating from '@/components/shared/StarRating';

export default function BarbershopDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const shopId = window.location.pathname.split('/').pop();
  const { user } = useAuth();

  const [bookingService, setBookingService] = useState(null);

  const { data: shops = [] } = useQuery({
    queryKey: ['barbershop', shopId],
    queryFn: () => db.entities.Barbershop.filter({ id: shopId }),
  });
  const shop = shops[0];

  const { data: services = [] } = useQuery({
    queryKey: ['services', shopId],
    queryFn: () => db.entities.Service.filter({ barbershop_id: shopId }),
    enabled: !!shopId,
  });

  const { data: photos = [] } = useQuery({
    queryKey: ['photos', shopId],
    queryFn: () => db.entities.GalleryPhoto.filter({ barbershop_id: shopId }),
    enabled: !!shopId,
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments', shopId],
    queryFn: () => db.entities.Appointment.filter({ barbershop_id: shopId }),
    enabled: !!shopId,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', shopId],
    queryFn: () => db.entities.Review.filter({ barbershop_id: shopId }),
    enabled: !!shopId,
  });

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  if (!shop) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Cover Image */}
      <div className="relative h-56">
        <img
          src={shop.cover_image || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=400&fit=crop'}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0">
          <PageHeader variant="overlay" />
        </div>
      </div>

      {/* Shop Info */}
      <div className="px-4 -mt-10 relative z-10">
        <div className="flex items-end gap-4 mb-4">
          {shop.logo ? (
            <img src={shop.logo} alt="" className="w-20 h-20 rounded-xl border-2 border-background object-cover shadow-lg" />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Scissors className="w-8 h-8 text-primary-foreground" />
            </div>
          )}
          <div className="pb-1">
            <h1 className="font-heading text-2xl font-bold">{shop.name}</h1>
            {reviews.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1">
                <StarRating value={Math.round(avgRating)} readonly size="sm" />
                <span className="text-xs text-muted-foreground">{avgRating.toFixed(1)} ({reviews.length})</span>
              </div>
            )}
          </div>
        </div>

        {shop.description && (
          <p className="text-sm text-muted-foreground mb-4">{shop.description}</p>
        )}

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{shop.address}</span>
          </div>
          {shop.phone && (
            <a href={`tel:${shop.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{shop.phone}</span>
            </a>
          )}
          {shop.opening_hour && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{shop.opening_hour} - {shop.closing_hour}</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="w-full bg-secondary grid grid-cols-3">
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
              <Scissors className="w-3.5 h-3.5 mr-1" /> Serviços
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
              <Image className="w-3.5 h-3.5 mr-1" /> Galeria
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs">
              <Star className="w-3.5 h-3.5 mr-1" /> Avaliações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-4 space-y-3">
            {services.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Nenhum serviço cadastrado</p>
            ) : (
              services.map(service => (
                <ServiceCard key={service.id} service={service} onBook={() => setBookingService(service)} />
              ))
            )}
          </TabsContent>

          <TabsContent value="gallery" className="mt-4">
            <GalleryGrid photos={photos} />
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <ReviewSection barbershopId={shopId} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      {bookingService && (
        <BookingModal
          open={!!bookingService}
          onClose={() => setBookingService(null)}
          service={bookingService}
          barbershop={shop}
          existingAppointments={appointments}
          user={user}
        />
      )}
    </div>
  );
}