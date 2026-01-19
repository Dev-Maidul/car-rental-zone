import { db } from '../../config/database';

export const createVehicle = async (data: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = data;

  const result = await db.query(
    `INSERT INTO vehicles (
  vehicle_name,
  type,
  registration_number,
  daily_rent_price,
  availability_status
)
VALUES ($1,$2,$3,$4,$5)
RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

export const getAllVehicles = async () => {
  const result = await db.query('SELECT * FROM vehicles ORDER BY id DESC');
  return result.rows;
};

export const getVehicleById = async (id: number) => {
  const result = await db.query('SELECT * FROM vehicles WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateVehicleById = async (id: number, data: any) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const key in data) {
    fields.push(`${key} = $${index}`);
    values.push(data[key]);
    index++;
  }

  values.push(id);

  const result = await db.query(
    `UPDATE vehicles SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deleteVehicleById = async (id: number) => {
  await db.query('DELETE FROM vehicles WHERE id = $1', [id]);
  return true;
};
