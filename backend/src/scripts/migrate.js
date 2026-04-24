import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, '../../schema.sql');

const run = async () => {
  const sql = await fs.readFile(schemaPath, 'utf8');
  await pool.query(sql);
  console.log('Migracao aplicada com sucesso.');
  await pool.end();
};

run().catch(async (error) => {
  console.error('Erro ao aplicar migracao:', error);
  await pool.end();
  process.exit(1);
});
