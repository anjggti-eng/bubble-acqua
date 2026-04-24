import { Router } from 'express';
import path from 'path';
import { env } from '../config/env.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/async-handler.js';
import { upload } from '../utils/uploads.js';

const router = Router();

router.post(
  '/',
  requireAuth,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo nao enviado.' });
    }

    const normalizedPath = req.file.path.split(path.sep).join('/');
    const relativePath = normalizedPath.replace(process.cwd().split(path.sep).join('/'), '').replace(/^\/+/, '');

    return res.status(201).json({
      file_url: `${env.appUrl}/${relativePath}`,
    });
  })
);

export default router;
