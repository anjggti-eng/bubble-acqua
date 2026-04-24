import { Router } from 'express';
import { query } from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/async-handler.js';
import { addFilter, parseLimit, parseSort } from '../utils/query.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const filters = [];
    const params = [];

    addFilter(filters, params, 'owner_email = ?', req.query.ownerEmail);
    addFilter(filters, params, 'owner_profile_id = ?', req.query.ownerProfileId);

    const orderBy = parseSort(req.query.sort, ['created_at', 'name'], 'created_at desc');
    const limit = parseLimit(req.query.limit, 100);

    params.push(limit);

    const { rows } = await query(
      `select *
       from barbershops
       ${filters.length ? `where ${filters.join(' and ')}` : ''}
       order by ${orderBy}
       limit $${params.length}`,
      params
    );

    return res.json(rows);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { rows } = await query('select * from barbershops where id = $1', [req.params.id]);
    if (!rows[0]) {
      return res.status(404).json({ error: 'Barbearia nao encontrada.' });
    }
    return res.json(rows[0]);
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      address,
      phone,
      latitude,
      longitude,
      cover_image,
      logo,
      opening_hour,
      closing_hour,
      working_days,
    } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: 'Nome e endereco sao obrigatorios.' });
    }

    const { rows } = await query(
      `insert into barbershops (
         owner_profile_id,
         owner_email,
         name,
         description,
         address,
         phone,
         latitude,
         longitude,
         cover_image,
         logo,
         opening_hour,
         closing_hour,
         working_days
       )
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       returning *`,
      [
        req.user.id,
        req.user.email,
        name,
        description || null,
        address,
        phone || null,
        latitude ?? null,
        longitude ?? null,
        cover_image || null,
        logo || null,
        opening_hour || null,
        closing_hour || null,
        Array.isArray(working_days) ? working_days : [],
      ]
    );

    return res.status(201).json(rows[0]);
  })
);

router.patch(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows: ownedRows } = await query(
      'select * from barbershops where id = $1 and owner_profile_id = $2',
      [req.params.id, req.user.id]
    );

    if (!ownedRows[0]) {
      return res.status(403).json({ error: 'Voce nao pode editar esta barbearia.' });
    }

    const allowedFields = [
      'name',
      'description',
      'address',
      'phone',
      'latitude',
      'longitude',
      'cover_image',
      'logo',
      'opening_hour',
      'closing_hour',
      'working_days',
    ];
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
      `update barbershops
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
    const result = await query(
      'delete from barbershops where id = $1 and owner_profile_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Barbearia nao encontrada ou sem permissao.' });
    }

    return res.json({ success: true });
  })
);

export default router;
