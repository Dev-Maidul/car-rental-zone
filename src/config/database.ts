import { Pool } from 'pg';
import { ENV } from './environment';


export const db = new Pool({
  connectionString: ENV.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await db.connect();
    console.log('Database connected successfully ');
  } catch (error) {
    console.error('Database connection error :', error);
    process.exit(1);
  }
};
