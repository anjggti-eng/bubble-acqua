import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, MapPin, User, Scissors } from 'lucide-react';

const STATUS = {
  pendente: {
    label: 'Pendente',
    bar: 'bg-amber-500',
    bg: 'bg-amber-500/5 border-amber-500/20',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  confirmado: {
    label: 'Confirmado',
    bar: 'bg-emerald-500',
    bg: 'bg-emerald-500/5 border-emerald-500/20',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  cancelado: {
    label: 'Cancelado',
    bar: 'bg-red-500',
    bg: 'bg-red-500/5 border-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-400',
  },
  concluido: {
    label: 'Concluído',
    bar: 'bg-blue-500',
    bg: 'bg-blue-500/5 border-blue-500/20',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
};

export default function AppointmentCard({ apt, actions }) {
  const s = STATUS[apt.status] || STATUS.pendente;

  return (
    <div className={`rounded-xl border overflow-hidden ${s.bg}`}>
      {/* Color bar */}
      <div className={`h-1 w-full ${s.bar}`} />

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Scissors className="w-3.5 h-3.5 text-primary shrink-0" />
              <h3 className="font-semibold text-sm truncate">{apt.service_name || 'Serviço'}</h3>
            </div>
            {apt.barbershop_name && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" /> {apt.barbershop_name}
              </p>
            )}
            {apt.client_name && !apt.barbershop_name && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3 shrink-0" /> {apt.client_name}
              </p>
            )}
          </div>
          {/* Status badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ml-2 shrink-0 ${s.text} bg-white/5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {apt.date ? format(new Date(apt.date + 'T12:00:00'), "dd MMM yyyy", { locale: ptBR }) : '-'}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {apt.time}
          </span>
          {apt.service_price != null && (
            <span className="text-primary font-semibold">R$ {apt.service_price.toFixed(2)}</span>
          )}
        </div>

        {actions && <div className="mt-3">{actions}</div>}
      </div>
    </div>
  );
}