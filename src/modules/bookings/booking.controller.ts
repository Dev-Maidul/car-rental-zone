import { Request, Response } from 'express';
import * as bookingService from './booking.service';

const createBooking = async (req: Request, res: Response) => {
  try {
    const data = await bookingService.createBooking(req.user, req.body);
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const data = await bookingService.getBookings(req.user);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const cancelBooking = async (req: Request, res: Response) => {
  try {
    const data = await bookingService.cancelBooking(
      req.user,
      Number(req.params.bookingId)
    );
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const returnVehicle = async (req: Request, res: Response) => {
  try {
    const data = await bookingService.returnVehicle(
      Number(req.params.bookingId)
    );
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  createBooking,
  getBookings,
  cancelBooking,
  returnVehicle,
};
