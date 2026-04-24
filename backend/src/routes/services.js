import { Router } from 'express';
import { query } from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/async-handler.js';
import { addFilter, parseSort } from '../utils/query.js';

const router = Router();

const assertShopOwner = async (barbershopId, userId) => {
  const { rows } = await query(
    'select id from barbershops where id = $1 and owner_profile_id = $2',
    [barbershopId, userId]
  );
  return Boolean(rows[0]);
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const filters = [];
    const params = [];
    addFilter(filters, params, 'barbershop_id = ?', req.query.barbershopId);
    const orderBy = parseSort(req.query.sort, ['created_at', 'name', 'price'], 'name asc');

    const { rows } = await query(
      `select *
       from services
       ${filters.length ? `where ${filters.join(' and ')}` : ''}
       order by ${orderBy}`,
      params
    );

    return res.json(rows);
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { barbershop_id, name, description, price, duration_minutes, image_url } = req.body;

    if (!barbershop_id || !name || price === undefined || !duration_minutes) {
      return res.status(400).json({ error: 'Campos obrigatorios ausentes.' });
    }

    const isOwner = await assertShopOwner(barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode adicionar servicos nesta barbearia.' });
    }

    const { rows } = await query(
      `insert into services (barbershop_id, name, description, price, duration_minutes, image_url)
       values ($1, $2, $3, $4, $5, $6)
       returning *`,
      [barbershop_id, name, description || null, price, duration_minutes, image_url || null]
    );

    return res.status(201).json(rows[0]);
  })
);

router.patch(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows: serviceRows } = await query('select * from services where id = $1', [req.params.id]);
    const service = serviceRows[0];

    if (!service) {
      return res.status(404).json({ error: 'Servico nao encontrado.' });
    }

    const isOwner = await assertShopOwner(service.barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode editar este servico.' });
    }

    const allowedFields = ['name', 'description', 'price', 'duration_minutes', 'image_url'];
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
      `update services
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
    const { rows: serviceRows } = await query('select * from services where id = $1', [req.params.id]);
    const service = serviceRows[0];

    if (!service) {
      return res.status(404).json({ error: 'Servico nao encontrado.' });
    }

    const isOwner = await assertShopOwner(service.barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode remover este servico.' });
    }

    await query('delete from services where id = $1', [req.params.id]);
    return res.json({ success: true });
  })
);

export default router;
