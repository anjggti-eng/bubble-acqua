const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';

import { useAuth } from '@/lib/AuthContext';

/**
 * Returns the count of pending appointments relevant to the current user.
 * - If user owns a shop: counts pending appointments for their shop.
 * - If user is a client: counts their own pending appointments.
 * Updates in real-time via subscription.
 */
export function usePendingCount() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    let isMounted = true;

    const load = async () => {
      // Check if user owns a shop
      const shops = await db.entities.Barbershop.filter({ owner_email: user.email });
      if (!isMounted) return;

      let pending = [];
      if (shops.length > 0) {
        // Owner: pendentes na loja deles
        pending = await db.entities.Appointment.filter({
          barbershop_id: shops[0].id,
          status: 'pendente',
        });
      } else {
        // Client: seus próprios pendentes
        pending = await db.entities.Appointment.filter({
          client_email: user.email,
          status: 'pendente',
        });
      }
      if (isMounted) setCount(pending.length);
    };

    load();

    // Real-time subscription
    const unsubscribe = db.entities.Appointment.subscribe(() => {
      load();
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user?.email]);

  return count;
}