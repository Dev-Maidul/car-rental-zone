import { db } from '../config/database';

export const getAllUsers = async () => {
  const result = await db.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result.rows;
};

export const getUserById = async (id: number) => {
  const result = await db.query(
    `SELECT id, name, email, phone, role FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const updateUserById = async (
  id: number,
  data: { name?: string; phone?: string; role?: string }
) => {
  const { name, phone, role } = data;
  const result = await db.query(
    `UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), role = COALESCE($3, role)
     WHERE id = $4 RETURNING id, name, email, phone, role`,
    [name, phone, role, id]
  );
  return result.rows[0];
};

export const deleteUserById = async (id: number) => {
  await db.query(`DELETE FROM users WHERE id = $1`, [id]);
  return true;
};
