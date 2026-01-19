import { Request, Response } from 'express';
import { loginUser } from './auth.service';
import { createUser } from '../users/user.service';



export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

// create user
export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const user = await createUser({ name, email, password, phone, role });
    return res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
