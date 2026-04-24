const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function ReviewSection({ barbershopId }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', barbershopId],
    queryFn: () => db.entities.Review.filter({ barbershop_id: barbershopId }, '-created_date', 20),
    enabled: !!barbershopId,
  });

  const myReview = reviews.find(r => r.client_email === user?.email);
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;

  const submitMutation = useMutation({
    mutationFn: () => {
      if (myReview) {
        return db.entities.Review.update(myReview.id, { rating, comment });
      }
      return db.entities.Review.create({
        barbershop_id: barbershopId,
        client_email: user?.email,
        client_name: user?.full_name || 'Anônimo',
        rating,
        comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', barbershopId] });
      toast({ title: 'Avaliação enviada!' });
      setComment('');
      setRating(0);
    },
  });

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
        <div className="text-center">
          <p className="font-heading text-4xl font-bold text-primary">{avgRating.toFixed(1)}</p>
          <StarRating value={Math.round(avgRating)} readonly size="sm" />
          <p className="text-xs text-muted-foreground mt-1">{reviews.length} avaliações</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map(star => {
            const count = reviews.filter(r => r.rating === star).length;
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3">{star}</span>
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write review */}
      {user && (
        <div className="p-4 bg-card rounded-xl border border-border space-y-3">
          <p className="text-sm font-medium">{myReview ? 'Editar sua avaliação' : 'Avalie esta barbearia'}</p>
          <StarRating value={myReview && rating === 0 ? myReview.rating : rating} onChange={setRating} size="lg" />
          <textarea
            value={comment || (myReview ? myReview.comment || '' : '')}
            onChange={e => setComment(e.target.value)}
            placeholder="Deixe um comentário (opcional)..."
            rows={2}
            className="w-full bg-secondary rounded-lg border border-border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
          />
          <Button
            size="sm"
            onClick={() => submitMutation.mutate()}
            disabled={rating === 0 && !myReview || submitMutation.isPending}
            className="w-full bg-primary text-primary-foreground"
          >
            <Send className="w-3.5 h-3.5 mr-2" />
            {submitMutation.isPending ? 'Enviando...' : 'Enviar Avaliação'}
          </Button>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="p-3 bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium">{r.client_name}</p>
              <StarRating value={r.rating} readonly size="sm" />
            </div>
            {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
            Seja o primeiro a avaliar!
          </div>
        )}
      </div>
    </div>
  );
}