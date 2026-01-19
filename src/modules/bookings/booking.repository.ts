import { db } from '../../config/database';

export const createBookingRepo = async (data: any) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = data;

  const result = await db.query(
    `INSERT INTO bookings 
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  return result.rows[0];
};

export const getBookingByIdRepo = async (id: number) => {
  const result = await db.query('SELECT * FROM bookings WHERE id=$1', [id]);
  return result.rows[0];
};

export const getAllBookingsRepo = async () => {
  const result = await db.query('SELECT * FROM bookings ORDER BY id DESC');
  return result.rows;
};

export const getBookingsByCustomerRepo = async (customer_id: number) => {
  const result = await db.query('SELECT * FROM bookings WHERE customer_id=$1', [
    customer_id,
  ]);
  return result.rows;
};

export const updateBookingStatusRepo = async (id: number, status: string) => {
  const result = await db.query(
    'UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};
