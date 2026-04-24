import { Router } from 'express';
import { query } from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/async-handler.js';
import { comparePassword, createToken, hashPassword, publicUserSelect } from '../utils/auth.js';

const router = Router();

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, password, full_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha sao obrigatorios.' });
    }

    const password_hash = await hashPassword(password);
    const { rows } = await query(
      `insert into profiles (email, password_hash, full_name)
       values ($1, $2, $3)
       returning ${publicUserSelect}`,
      [email.toLowerCase().trim(), password_hash, full_name?.trim() || null]
    );

    const user = rows[0];
    const token = createToken(user.id);

    return res.status(201).json({ token, user });
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha sao obrigatorios.' });
    }

    const { rows } = await query(
      `select id, email, password_hash, full_name, role, onboarded, profile_photo, bio, created_at, updated_at
       from profiles
       where email = $1`,
      [email.toLowerCase().trim()]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciais invalidas.' });
    }

    const passwordMatches = await comparePassword(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Credenciais invalidas.' });
    }

    const token = createToken(user.id);
    const { password_hash, ...publicUser } = user;

    return res.json({ token, user: publicUser });
  })
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    return res.json(req.user);
  })
);

router.patch(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const allowedFields = ['full_name', 'role', 'onboarded', 'profile_photo', 'bio'];
    const entries = Object.entries(req.body).filter(([key, value]) => allowedFields.includes(key) && value !== undefined);

    if (entries.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo valido enviado.' });
    }

    const setClauses = [];
    const params = [];

    entries.forEach(([key, value]) => {
      params.push(value);
      setClauses.push(`${key} = $${params.length}`);
    });

    params.push(req.user.id);

    const { rows } = await query(
      `update profiles
       set ${setClauses.join(', ')}, updated_at = now()
       where id = $${params.length}
       returning ${publicUserSelect}`,
      params
    );

    return res.json(rows[0]);
  })
);

router.post(
  '/logout',
  requireAuth,
  asyncHandler(async (_req, res) => {
    return res.json({ success: true });
  })
);

export default router;
