import {pool} from "./db"

// Verify if the table exists, if not, create it
export async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS exchange_rates (
        id SERIAL PRIMARY KEY,
        rate FLOAT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Verify/Create the table exchange_rates successfully');
  } catch (error) {
    console.error('Error while checking/creating exchange_rates table', error);
  } 
}