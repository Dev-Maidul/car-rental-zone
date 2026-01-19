import { Router } from 'express';
import {
  getUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from './user.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const userRoutes = Router();

userRoutes.get('/', authenticate, authorize('admin'), getUsersHandler);
userRoutes.get('/:userId', authenticate, authorize('admin', 'customer'), getUserHandler);
userRoutes.put('/:userId', authenticate, authorize('admin', 'customer'), updateUserHandler);
userRoutes.delete('/:userId', authenticate, authorize('admin'), deleteUserHandler);

export default userRoutes;
