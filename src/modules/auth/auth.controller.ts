// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as authService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
  }
  try {
    const created = await authService.registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: created.id,
        name: created.name,
        email: created.email,
        phone: created.phone,
        role: created.role,
      },
    });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};
