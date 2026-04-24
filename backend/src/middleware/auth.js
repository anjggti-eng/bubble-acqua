import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { query } from '../db/index.js';

const getTokenFromHeader = (headerValue) => {
  if (!headerValue) return null;
  const [type, token] = headerValue.split(' ');
  return type === 'Bearer' ? token : null;
};

export const requireAuth = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({ error: 'Token ausente.' });
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const { rows } = await query(
      `select id, email, full_name, role, onboarded, profile_photo, bio, created_at, updated_at
       from profiles
       where id = $1`,
      [payload.userId]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuario nao encontrado.' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (_error) {
    return res.status(401).json({ error: 'Token invalido.' });
  }
};
