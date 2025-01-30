import {pool} from "./db"

// Verify if the table exists, if not, create it
export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS exchange_rates (
      id SERIAL PRIMARY KEY,
      rate FLOAT NOT NULL,
      created_at DATE DEFAULT CURRENT_DATE
    );
  `);
}

// retrieve the most recent exchange rate
export async function getExchangeRate(){
  const response = await pool.query(`
    SELECT rate,created_at FROM exchange_rates ORDER BY created_at DESC LIMIT 1;
  `);
  return response?.rows[0];
}

export async function getExchangeRateHistory(start_date: string | undefined, end_date: string | undefined){
  let query = ""
  if (start_date && end_date){
    query = `SELECT rate, created_at FROM exchange_rates WHERE created_at BETWEEN '${start_date}' AND '${end_date}' ORDER BY created_at;`
  } else {
    query = `SELECT rate, created_at FROM exchange_rates ORDER BY created_at;`
  }
  const response = await pool.query(query);
  return response.rows;
}

// save the latest exchange rate in the database
export async function saveExchangeRate(rate: string) {
  // clean the rate value
  rate = rate.replace(",",".")
  const parsedRate = parseFloat(rate).toFixed(2)
  // generate the current date with the specified format
  const date = new Date().toISOString().split('T')[0];
  console.log(date, parsedRate)
  await pool.query(`INSERT INTO exchange_rates (rate, created_at) VALUES (${parsedRate}, '${date}');`)
}