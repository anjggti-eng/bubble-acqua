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
    const orderBy = parseSort(req.query.sort, ['created_at', 'title', 'category'], 'created_at desc');

    const { rows } = await query(
      `select *
       from gallery_photos
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
    const { barbershop_id, image_url, title, category } = req.body;

    if (!barbershop_id || !image_url) {
      return res.status(400).json({ error: 'Barbearia e imagem sao obrigatorios.' });
    }

    const isOwner = await assertShopOwner(barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode adicionar fotos nesta barbearia.' });
    }

    const { rows } = await query(
      `insert into gallery_photos (barbershop_id, image_url, title, category)
       values ($1, $2, $3, $4)
       returning *`,
      [barbershop_id, image_url, title || null, category || null]
    );

    return res.status(201).json(rows[0]);
  })
);

router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows } = await query('select * from gallery_photos where id = $1', [req.params.id]);
    const photo = rows[0];

    if (!photo) {
      return res.status(404).json({ error: 'Foto nao encontrada.' });
    }

    const isOwner = await assertShopOwner(photo.barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode remover esta foto.' });
    }

    await query('delete from gallery_photos where id = $1', [req.params.id]);
    return res.json({ success: true });
  })
);

export default router;
