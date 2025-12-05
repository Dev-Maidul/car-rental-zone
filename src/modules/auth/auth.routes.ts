// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { body } from "express-validator";
import { signup, signin } from "./auth.controller";

const router = Router();

// POST /api/v1/auth/signup
router.post(
  "/signup",
  [
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("phone").isString().notEmpty(),
    body("role").optional().isIn(["admin", "customer"]),
  ],
  signup
);

// POST /api/v1/auth/signin
router.post(
  "/signin",
  [
    body("email").isEmail(),
    body("password").isString().notEmpty(),
  ],
  signin
);

export default router;
