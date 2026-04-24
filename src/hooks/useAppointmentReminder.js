import { useEffect, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

/**
 * Checks appointments every minute and fires a toast
 * when one is 30 minutes (±1 min) away.
 */
export default function useAppointmentReminder(appointments = []) {
  const notifiedRef = useRef(new Set());

  useEffect(() => {
    if (!appointments.length) return;

    const check = () => {
      const now = new Date();
      appointments.forEach(apt => {
        if (apt.status !== 'confirmado' && apt.status !== 'pendente') return;
        if (notifiedRef.current.has(apt.id)) return;

        const [h, m] = (apt.time || '00:00').split(':').map(Number);
        const aptDate = new Date(apt.date + 'T' + String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':00');
        const diffMs = aptDate - now;
        const diffMin = diffMs / 60000;

        // Fire between 29 and 31 minutes before
        if (diffMin >= 29 && diffMin <= 31) {
          notifiedRef.current.add(apt.id);
          toast({
            title: '⏰ Lembrete de Agendamento',
            description: `Seu horário de "${apt.service_name || 'serviço'}" em ${apt.barbershop_name || 'sua barbearia'} começa em 30 minutos!`,
            duration: 8000,
          });
        }
      });
    };

    check(); // run immediately
    const interval = setInterval(check, 60000); // every minute
    return () => clearInterval(interval);
  }, [appointments]);
}