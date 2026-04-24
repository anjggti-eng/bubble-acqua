const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';

import { useAuth } from '@/lib/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import useAppointmentReminder from '@/hooks/useAppointmentReminder';

export default function Appointments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['my-appointments', user?.email],
    queryFn: () => db.entities.Appointment.filter({ client_email: user?.email }, '-date', 50),
    enabled: !!user?.email,
  });

  useAppointmentReminder(appointments);

  const cancelMutation = useMutation({
    mutationFn: (id) => db.entities.Appointment.update(id, { status: 'cancelado' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-appointments'] });
      toast({ title: 'Agendamento cancelado' });
    },
  });

  return (
    <div className="px-4 pt-6">
      <h1 className="font-heading text-2xl font-bold mb-6">Meus Agendamentos</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-28 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-1">Nenhum agendamento</p>
          <p className="text-sm text-muted-foreground">Encontre uma barbearia e agende seu horário</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map(apt => (
            <AppointmentCard
              key={apt.id}
              apt={apt}
              actions={
                (apt.status === 'pendente' || apt.status === 'confirmado') ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cancelMutation.mutate(apt.id)}
                    disabled={cancelMutation.isPending}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs p-0 h-auto"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Cancelar agendamento
                  </Button>
                ) : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}