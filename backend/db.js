// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lost_found_db',
  password: 'Apost25@#', // replace with your password
  port: 5432,  //replace with your PostGRE SQL port 
});

export default pool;
