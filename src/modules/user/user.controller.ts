import { Request, Response } from "express";
import { pool } from "../../config/db";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(`SELECT id, name, email, phone, role FROM users ORDER BY id`);
    return res.status(200).json({ success: true, message: "Users retrieved successfully", data: rows });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};
