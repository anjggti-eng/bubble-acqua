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

    addFilter(filters, params, 'barbershop_id = ?', req.query.barbershopId);
    const orderBy = parseSort(req.query.sort, ['created_at', 'rating'], 'created_at desc');
    const limit = parseLimit(req.query.limit, 20);
    params.push(limit);

    const { rows } = await query(
      `select *
       from reviews
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
    const { barbershop_id, rating, comment } = req.body;

    if (!barbershop_id || rating === undefined) {
      return res.status(400).json({ error: 'Barbearia e nota sao obrigatorios.' });
    }

    const { rows } = await query(
      `insert into reviews (profile_id, barbershop_id, client_email, client_name, rating, comment)
       values ($1, $2, $3, $4, $5, $6)
       on conflict (barbershop_id, client_email)
       do update set rating = excluded.rating, comment = excluded.comment, updated_at = now()
       returning *`,
      [req.user.id, barbershop_id, req.user.email, req.user.full_name || 'Anonimo', rating, comment || null]
    );

    return res.status(201).json(rows[0]);
  })
);

router.patch(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows: reviewRows } = await query('select * from reviews where id = $1', [req.params.id]);
    const review = reviewRows[0];

    if (!review) {
      return res.status(404).json({ error: 'Avaliacao nao encontrada.' });
    }

    if (review.profile_id !== req.user.id && review.client_email !== req.user.email) {
      return res.status(403).json({ error: 'Voce nao pode editar esta avaliacao.' });
    }

    const allowedFields = ['rating', 'comment'];
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
      `update reviews
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
      'delete from reviews where id = $1 and (profile_id = $2 or client_email = $3)',
      [req.params.id, req.user.id, req.user.email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Avaliacao nao encontrada ou sem permissao.' });
    }

    return res.json({ success: true });
  })
);

export default router;
