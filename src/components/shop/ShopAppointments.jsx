const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import AppointmentCard from '@/components/appointments/AppointmentCard';

export default function ShopAppointments({ shopId }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments = [] } = useQuery({
    queryKey: ['shop-appointments', shopId],
    queryFn: () => db.entities.Appointment.filter({ barbershop_id: shopId }, '-date', 100),
    enabled: !!shopId,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => db.entities.Appointment.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop-appointments'] });
      toast({ title: 'Status atualizado' });
    },
  });

  const upcoming = appointments.filter(a => a.status !== 'cancelado' && a.status !== 'concluido');
  const past = appointments.filter(a => a.status === 'cancelado' || a.status === 'concluido');

  const getActions = (apt) => {
    if (apt.status === 'pendente') return (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => updateMutation.mutate({ id: apt.id, status: 'confirmado' })}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8">
          <CheckCircle className="w-3.5 h-3.5 mr-1" /> Confirmar
        </Button>
        <Button size="sm" variant="outline" onClick={() => updateMutation.mutate({ id: apt.id, status: 'cancelado' })}
          className="flex-1 text-destructive border-destructive/30 text-xs h-8">
          <XCircle className="w-3.5 h-3.5 mr-1" /> Recusar
        </Button>
      </div>
    );
    if (apt.status === 'confirmado') return (
      <Button size="sm" onClick={() => updateMutation.mutate({ id: apt.id, status: 'concluido' })}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Marcar como Concluído
      </Button>
    );
    return null;
  };

  return (
    <div className="space-y-5">
      {upcoming.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Próximos</p>
          {upcoming.map(apt => <AppointmentCard key={apt.id} apt={apt} actions={getActions(apt)} />)}
        </div>
      )}

      {past.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Histórico</p>
          {past.map(apt => <AppointmentCard key={apt.id} apt={apt} />)}
        </div>
      )}

      {appointments.length === 0 && (
        <p className="text-center py-8 text-muted-foreground text-sm">Nenhum agendamento ainda</p>
      )}
    </div>
  );
}