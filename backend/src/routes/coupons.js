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
    if (req.query.active !== undefined) {
      addFilter(filters, params, 'active = ?', req.query.active === 'true');
    }
    const orderBy = parseSort(req.query.sort, ['created_at', 'expires_at', 'title'], 'created_at desc');

    const { rows } = await query(
      `select *
       from coupons
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
    const {
      barbershop_id,
      barbershop_name,
      code,
      title,
      description,
      discount_type,
      discount_value,
      expires_at,
      active,
    } = req.body;

    if (!barbershop_id || !code || !title || !discount_type || discount_value === undefined) {
      return res.status(400).json({ error: 'Campos obrigatorios ausentes.' });
    }

    const isOwner = await assertShopOwner(barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode criar cupons nesta barbearia.' });
    }

    const { rows } = await query(
      `insert into coupons (
         barbershop_id,
         barbershop_name,
         code,
         title,
         description,
         discount_type,
         discount_value,
         expires_at,
         active
       )
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       returning *`,
      [
        barbershop_id,
        barbershop_name || null,
        code,
        title,
        description || null,
        discount_type,
        discount_value,
        expires_at || null,
        active ?? true,
      ]
    );

    return res.status(201).json(rows[0]);
  })
);

router.patch(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows: couponRows } = await query('select * from coupons where id = $1', [req.params.id]);
    const coupon = couponRows[0];

    if (!coupon) {
      return res.status(404).json({ error: 'Cupom nao encontrado.' });
    }

    const isOwner = await assertShopOwner(coupon.barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode editar este cupom.' });
    }

    const allowedFields = [
      'code',
      'title',
      'description',
      'discount_type',
      'discount_value',
      'expires_at',
      'active',
      'barbershop_name',
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
      `update coupons
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
    const { rows: couponRows } = await query('select * from coupons where id = $1', [req.params.id]);
    const coupon = couponRows[0];

    if (!coupon) {
      return res.status(404).json({ error: 'Cupom nao encontrado.' });
    }

    const isOwner = await assertShopOwner(coupon.barbershop_id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ error: 'Voce nao pode remover este cupom.' });
    }

    await query('delete from coupons where id = $1', [req.params.id]);
    return res.json({ success: true });
  })
);

export default router;
