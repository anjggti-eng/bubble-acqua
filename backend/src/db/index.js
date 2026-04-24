import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseUrl.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined,
});

export const query = (text, params = []) => pool.query(text, params);

export const withTransaction = async (callback) => {
  const client = await pool.connect();

  try {
    await client.query('begin');
    const result = await callback(client);
    await client.query('commit');
    return result;
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
};
