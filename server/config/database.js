import pg from 'pg'
import dotenv from 'dotenv'
import path from 'path' // 
import { fileURLToPath } from 'url' // <-- Import 'fileURLToPath'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '..', '..', 'server', '.env'); 

dotenv.config({ path: envPath }); 


const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      rejectUnauthorized: false
    }
}



export const pool = new pg.Pool(config)