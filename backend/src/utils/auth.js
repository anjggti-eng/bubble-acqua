import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const hashPassword = (password) => bcrypt.hash(password, 10);
export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export const createToken = (userId) =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: '30d' });

export const publicUserSelect = `
  id,
  email,
  full_name,
  role,
  onboarded,
  profile_photo,
  bio,
  created_at,
  updated_at
`;
