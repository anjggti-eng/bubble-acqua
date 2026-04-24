const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';

import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Clock, Scissors, Loader2 } from 'lucide-react';
import TimeSlotPicker from './TimeSlotPicker';

function generateTimeSlots(openHour, closeHour) {
  const slots = [];
  const [openH, openM] = (openHour || '08:00').split(':').map(Number);
  const [closeH, closeM] = (closeHour || '20:00').split(':').map(Number);
  let h = openH, m = openM;
  while (h < closeH || (h === closeH && m < closeM)) {
    slots.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
    m += 30;
    if (m >= 60) { h++; m = 0; }
  }
  return slots;
}

export default function BookingModal({ open, onClose, service, barbershop, existingAppointments, user }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [clientName, setClientName] = useState(user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const timeSlots = useMemo(() => 
    generateTimeSlots(barbershop?.opening_hour, barbershop?.closing_hour),
    [barbershop]
  );

  const bookedTimes = useMemo(() => {
    if (!date || !existingAppointments) return [];
    const dateStr = format(date, 'yyyy-MM-dd');
    return existingAppointments
      .filter(a => a.date === dateStr && a.status !== 'cancelado')
      .map(a => a.time);
  }, [date, existingAppointments]);

  const handleBook = async () => {
    if (!date || !time || !clientName.trim()) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
      return;
    }
    setLoading(true);

    const newAppointment = {
      id: `optimistic-${Date.now()}`,
      barbershop_id: barbershop.id,
      service_id: service.id,
      client_email: user?.email || '',
      client_name: clientName,
      date: format(date, 'yyyy-MM-dd'),
      time,
      status: 'pendente',
      service_name: service.name,
      service_price: service.price,
      barbershop_name: barbershop.name,
    };

    // Optimistic update
    queryClient.setQueryData(['appointments', barbershop.id], (old = []) => [...old, newAppointment]);
    queryClient.setQueryData(['my-appointments'], (old = []) => [...old, newAppointment]);

    onClose();
    toast({ title: 'Agendamento realizado!', description: `${format(date, 'dd/MM/yyyy')} às ${time}` });

    await db.entities.Appointment.create(newAppointment);
    queryClient.invalidateQueries({ queryKey: ['appointments', barbershop.id] });
    queryClient.invalidateQueries({ queryKey: ['my-appointments'] });
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Agendar Horário</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
            <Scissors className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">{service?.name}</p>
              <p className="text-xs text-muted-foreground">
                R$ {service?.price?.toFixed(2)} · {service?.duration_minutes} min
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Seu nome</Label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Digite seu nome"
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4" /> Escolha a data
            </Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => { setDate(d); setTime(''); }}
                disabled={(d) => isBefore(d, startOfDay(new Date()))}
                locale={ptBR}
                className="rounded-lg border border-border"
              />
            </div>
          </div>

          {date && (
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Horários disponíveis
              </Label>
              <TimeSlotPicker
                slots={timeSlots}
                selectedTime={time}
                onSelect={setTime}
                bookedTimes={bookedTimes}
              />
            </div>
          )}

          <Button
            onClick={handleBook}
            disabled={!date || !time || !clientName.trim() || loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar Agendamento'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}