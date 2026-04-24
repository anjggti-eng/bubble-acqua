import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { env } from '../config/env.js';

const uploadDirPath = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(uploadDirPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirPath),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension).replace(/[^a-zA-Z0-9-_]/g, '-');
    cb(null, `${Date.now()}-${baseName}${extension}`);
  },
});

export const upload = multer({ storage });
export const uploadDirPathResolved = uploadDirPath;
