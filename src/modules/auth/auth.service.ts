import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ENV } from '../../config/environment';
import { getUserByEmail } from '../../repositories/auth.repository';
import { db } from '../../config/database';

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    ENV.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
  };
};

export const createUserInDB = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
}) => {
  const { name, email, password, phone, role = 'customer' } = data;
  const result = await db.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role`,
    [name, email, password, phone, role]
  );
  return result.rows[0];
};
