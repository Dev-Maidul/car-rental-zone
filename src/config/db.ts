import { Pool } from "pg";
import config from ".";

//DB
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  try {
    await pool.query(`SELECT 1`);
    const sql = `
    DO $$
    BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname= 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin','customer');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname ='vehicle_type') THEN
    CREATE TYPE vehicle_type as ENUM ('car','bike','van','SUV');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname= 'availability_status') THEN
    CREATE TYPE availability_status AS ENUM ('available','booked');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
    CREATE TYPE booking_status AS ENUM ('active','cancelled','returned');
    END IF;
    END$$;

    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vechile_name TEXT NOT NULL,
    type vehicle_type NOT NULL,
    registration_number TEXT NOT NULL UNIQUE,
    daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price >0),
    availability_status availability_status NOT NULL DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    vehicle_id INTEGER NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL,
    total_price NUMERIC(12,2) NOT NULL CHECK (total_price > 0),
    status booking_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CHECK (rent_end_date > rent_start_date)
    );
   
    `;
    await pool.query(sql);
       console.log("DB initialized: connected and tables are ready.");
  } catch (error) {
    console.log("DB initialized error: ",error);
    process.exit(1);
  }
};

export default initDB;
