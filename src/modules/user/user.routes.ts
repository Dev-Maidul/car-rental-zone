import { Router } from "express";
import { getAllUsers } from "./user.controller";

const router = Router();

// GET /api/v1/users
router.get("/", getAllUsers);

export default router;
