import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 3000
})

// pool.on('connect', () => {
//   console.log('Connected to the database');
// });


// pool.on('error', (err) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);

// });

export {pool as db}