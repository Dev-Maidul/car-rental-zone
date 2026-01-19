import { Router } from 'express';
import bookingController from './booking.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const bookingRoutes = Router();

bookingRoutes.post(
  '/',
  authenticate,
  authorize('admin', 'customer'),
  bookingController.createBooking
);

bookingRoutes.get(
  '/',
  authenticate,
  authorize('admin', 'customer'),
  bookingController.getBookings
);

bookingRoutes.put(
  '/cancel/:bookingId',
  authenticate,
  authorize('customer'),
  bookingController.cancelBooking
);

bookingRoutes.put(
  '/return/:bookingId',
  authenticate,
  authorize('admin'),
  bookingController.returnVehicle
);

export default bookingRoutes;
