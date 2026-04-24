const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  pendente: { label: 'Pendente', class: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  confirmado: { label: 'Confirmado', class: 'bg-green-500/10 text-green-500 border-green-500/20' },
  cancelado: { label: 'Cancelado', class: 'bg-red-500/10 text-red-500 border-red-500/20' },
  concluido: { label: 'Concluído', class: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
};

export default function OwnerDashboard({ shopId }) {
  const { data: appointments = [] } = useQuery({
    queryKey: ['shop-appointments', shopId],
    queryFn: () => db.entities.Appointment.filter({ barbershop_id: shopId }, '-date', 50),
    enabled: !!shopId,
  });

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayApts = appointments.filter(a => a.date === today && a.status !== 'cancelado');
  const pending = appointments.filter(a => a.status === 'pendente');
  const totalRevenue = appointments
    .filter(a => a.status === 'concluido')
    .reduce((sum, a) => sum + (a.service_price || 0), 0);

  const upcoming = appointments
    .filter(a => a.date >= today && a.status !== 'cancelado')
    .slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-2xl font-bold font-heading">{todayApts.length}</p>
          <p className="text-[10px] text-muted-foreground">Hoje</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
          <p className="text-2xl font-bold font-heading">{pending.length}</p>
          <p className="text-[10px] text-muted-foreground">Pendentes</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <p className="text-lg font-bold font-heading">R${totalRevenue.toFixed(0)}</p>
          <p className="text-[10px] text-muted-foreground">Receita</p>
        </div>
      </div>

      {/* Upcoming appointments */}
      <div>
        <h3 className="font-heading text-base font-semibold mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" /> Próximos Agendamentos
        </h3>
        {upcoming.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground text-sm">Nenhum agendamento próximo</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map(apt => {
              const status = statusConfig[apt.status] || statusConfig.pendente;
              return (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-card rounded-xl border border-border">
                  <div>
                    <p className="font-medium text-sm">{apt.client_name}</p>
                    <p className="text-xs text-muted-foreground">{apt.service_name} · {apt.time}</p>
                    <p className="text-xs text-muted-foreground">
                      {apt.date ? format(new Date(apt.date + 'T12:00:00'), 'dd MMM', { locale: ptBR }) : ''}
                    </p>
                  </div>
                  <Badge className={`${status.class} border text-xs`}>{status.label}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}