import { pool } from "../../config/database";
import bcrypt from "bcryptjs";

export const findByEmail = async (email: string) => {
  const q = `SELECT id, name, email, phone, role, password FROM users WHERE email= $1 LIMIT 1`;
  const { rows } = await pool.query(q, [email]);
  return rows[0] || null;
};

export const createUser = async (user: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
}) => {
  const q = `
  INSERT INTO users (name,email,password,phone,role)
  VALUES ($1, $2, $3, $4, $5) RETURNING id,name,email,phone,role
  `;
  const values = [
    user.name,
    user.email,
    user.password,
    user.phone,
    user.role || "customer",
  ];
  const { rows } = await pool.query(q, values);
  return rows[0];
};

