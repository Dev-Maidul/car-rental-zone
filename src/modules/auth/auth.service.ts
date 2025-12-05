import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import * as userService from "../user/user.service";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const JWT_EXPIRES_IN = "8h";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
}) => {
  const email = payload.email.toLowerCase().trim();

  const existing = await userService.findByEmail(email);
  if (existing) {
    const err: any = new Error("Email already in use");
    err.status = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(payload.password, SALT_ROUNDS);

  const created = await userService.createUser({
    name: payload.name,
    email,
    password: hashed,
    phone: payload.phone,
    role: payload.role ?? "customer",
  });

  return created;
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const email = payload.email.toLowerCase().trim();
  const user = await userService.findByEmail(email);
  if (!user) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(payload.password, user.password);
  if (!match) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const tokenPayload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(tokenPayload, config.jwtSecret as string, { expiresIn: JWT_EXPIRES_IN });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};
