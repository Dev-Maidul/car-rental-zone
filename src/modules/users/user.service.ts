import bcrypt from 'bcrypt';
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../../repositories/user.repository';
import { createUserInDB } from '../auth/auth.service';

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return createUserInDB({ ...data, password: hashedPassword });
};

export const listUsers = async () => getAllUsers();
export const getUser = async (id: number) => getUserById(id);
export const updateUser = async (
  id: number,
  data: { name?: string; phone?: string; role?: string }
) => updateUserById(id, data);
export const removeUser = async (id: number) => deleteUserById(id);
