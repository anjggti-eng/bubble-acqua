import cors from 'cors';
import express from 'express';
import path from 'path';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import router from './routes/index.js';
import { query } from './db/index.js';
import { uploadDirPathResolved } from './utils/uploads.js';

const app = express();

app.use(
  cors({
    origin: env.corsOrigin.split(',').map((value) => value.trim()),
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(`/${path.basename(uploadDirPathResolved)}`, express.static(uploadDirPathResolved));

app.get('/health', async (_req, res, next) => {
  try {
    await query('select 1');
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.use('/api', router);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`API rodando em ${env.appUrl}`);
});
