
import { Router } from 'express';
import { createUserHandler, loginHandler } from './auth.controller';

const authRoutes = Router();

authRoutes.post('/signup', createUserHandler);
// POST /api/v1/auth/signin → login
authRoutes.post('/signin', loginHandler);

export default authRoutes;
