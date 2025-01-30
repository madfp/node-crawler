import { pool } from "../database/db";

const seeder = [
  {"created_at": "2025-01-29", "rate": "57.3208"},
  {"created_at": "2025-01-28", "rate": "57.2494"},
  {"created_at": "2025-01-27", "rate": "57.1542"},
  {"created_at": "2025-01-26", "rate": "56.7141"},
  {"created_at": "2025-01-23", "rate": "56.5106"},
  {"created_at": "2025-01-22", "rate": "56.1423"},
  {"created_at": "2025-01-21", "rate": "55.6217"},
  {"created_at": "2025-01-20", "rate": "55.1617"},
  {"created_at": "2025-01-19", "rate": "54.8477"},
  {"created_at": "2025-01-16", "rate": "54.7740"},
  {"created_at": "2025-01-15", "rate": "54.6231"},
  {"created_at": "2025-01-14", "rate": "54.2335"},
  {"created_at": "2025-01-13", "rate": "53.8293"},
  {"created_at": "2025-01-12", "rate": "53.7444"},
  {"created_at": "2025-01-09", "rate": "53.7444"},
  {"created_at": "2025-01-08", "rate": "53.7176"},
  {"created_at": "2025-01-07", "rate": "53.1495"},
  {"created_at": "2025-01-06", "rate": "52.9377"},
  {"created_at": "2025-01-05", "rate": "52.8795"},
  {"created_at": "2025-01-02", "rate": "52.8795"},
  {"created_at": "2025-01-01", "rate": "52.4409"},
  {"created_at": "2024-12-31", "rate": "51.8970"},
  {"created_at": "2024-12-30", "rate": "51.8970"},
  {"created_at": "2024-12-29", "rate": "51.8970"}
];

async function seedDatabase() {
  try {
    for (const item of seeder) {
      await pool.query(
        `INSERT INTO exchange_rates (rate, created_at) VALUES ($1, $2)`,
        [item.rate, new Date(item.created_at).toISOString().split('T')[0]]
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    pool.end();
  }
}

seedDatabase();