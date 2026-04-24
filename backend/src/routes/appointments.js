import { Router } from 'express';
import { query } from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/async-handler.js';
import { addFilter, parseLimit, parseSort } from '../utils/query.js';

const router = Router();

const getAppointmentWithShop = async (appointmentId) => {
  const { rows } = await query(
    `select a.*, b.owner_profile_id
     from appointments a
     join barbershops b on b.id = a.barbershop_id
     where a.id = $1`,
    [appointmentId]
  );

  return rows[0];
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const filters = [];
    const params = [];

    addFilter(filters, params, 'client_email = ?', req.query.clientEmail);
    addFilter(filters, params, 'profile_id = ?', req.query.profileId);
    addFilter(filters, params, 'barbershop_id = ?', req.query.barbershopId);
    addFilter(filters, params, 'status = ?', req.query.status);
    addFilter(filters, params, 'date = ?', req.query.date);

    const orderBy = parseSort(req.query.sort, ['created_at', 'date', 'time', 'status'], 'date desc, time desc');
    const limit = parseLimit(req.query.limit, 100);
    params.push(limit);

    const { rows } = await query(
      `select *
       from appointments
       ${filters.length ? `where ${filters.join(' and ')}` : ''}
       order by ${orderBy}
       limit $${params.length}`,
      params
    );

    return res.json(rows);
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const {
      barbershop_id,
      service_id,
      client_name,
      date,
      time,
      status,
      service_name,
      service_price,
      barbershop_name,
    } = req.body;

    if (!barbershop_id || !service_id || !client_name || !date || !time) {
      return res.status(400).json({ error: 'Campos obrigatorios ausentes.' });
    }

    const { rows } = await query(
      `insert into appointments (
         profile_id,
         barbershop_id,
         service_id,
         client_email,
         client_name,
         date,
         time,
         status,
         service_name,
         service_price,
         barbershop_name
       )
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       returning *`,
      [
        req.user.id,
        barbershop_id,
        service_id,
        req.user.email,
        client_name,
        date,
        time,
        status || 'pendente',
        service_name || null,
        service_price ?? null,
        barbershop_name || null,
      ]
    );

    return res.status(201).json(rows[0]);
  })
);

router.patch(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const appointment = await getAppointmentWithShop(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento nao encontrado.' });
    }

    const isOwner = appointment.owner_profile_id === req.user.id;
    const isClient = appointment.profile_id === req.user.id || appointment.client_email === req.user.email;

    if (!isOwner && !isClient) {
      return res.status(403).json({ error: 'Voce nao pode editar este agendamento.' });
    }

    if (isClient && !isOwner) {
      const requestedKeys = Object.keys(req.body);
      const onlyCancelStatus = requestedKeys.length === 1 && req.body.status === 'cancelado';

      if (!onlyCancelStatus) {
        return res.status(403).json({ error: 'Cliente so pode cancelar o proprio agendamento.' });
      }
    }

    const allowedFields = ['status', 'date', 'time', 'client_name'];
    const entries = Object.entries(req.body).filter(([key, value]) => allowedFields.includes(key) && value !== undefined);

    if (entries.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo valido enviado.' });
    }

    const params = [];
    const setClauses = [];

    entries.forEach(([key, value]) => {
      params.push(value);
      setClauses.push(`${key} = $${params.length}`);
    });

    params.push(req.params.id);

    const { rows } = await query(
      `update appointments
       set ${setClauses.join(', ')}, updated_at = now()
       where id = $${params.length}
       returning *`,
      params
    );

    return res.json(rows[0]);
  })
);

router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const appointment = await getAppointmentWithShop(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento nao encontrado.' });
    }

    const isOwner = appointment.owner_profile_id === req.user.id;
    const isClient = appointment.profile_id === req.user.id || appointment.client_email === req.user.email;

    if (!isOwner && !isClient) {
      return res.status(403).json({ error: 'Voce nao pode remover este agendamento.' });
    }

    await query('delete from appointments where id = $1', [req.params.id]);
    return res.json({ success: true });
  })
);

export default router;
