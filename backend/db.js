// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lost_found_db',
  password: 'Apost25@#', // replace with actual password
  port: 5433,
});

export default pool;
