import {
  createBookingRepo,
  getBookingByIdRepo,
  getAllBookingsRepo,
  getBookingsByCustomerRepo,
  updateBookingStatusRepo,
} from "./booking.repository";
import {
  getVehicleById,
  updateVehicleById,
} from "../vehicles/vehicle.repository";

export const createBooking = async (user: any, payload: any) => {
  const { vehicle_id, rent_start_date, rent_end_date } = payload;

  // Check vehicle availability
  const vehicle = await getVehicleById(vehicle_id);
  if (!vehicle) throw new Error("Vehicle not found!");
  if (vehicle.availability_status !== "available")
    throw new Error("Vehicle is not available!");

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);
  if (endDate <= startDate)
    throw new Error("End date must be after start date");

  const days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );
  const total_price = days * Number(vehicle.daily_rent_price);

  // Create booking
  const booking = await createBookingRepo({
    customer_id: user.id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status: "active",
  });

  // Update vehicle to booked
  await updateVehicleById(vehicle_id, { availability_status: "booked" });

  return booking;
};

export const getBookings = async (user: any) => {
  if (user.role === "admin") {
    return await getAllBookingsRepo();
  } else {
    return await getBookingsByCustomerRepo(user.id);
  }
};

export const cancelBooking = async (user: any, bookingId: number) => {
  const booking = await getBookingByIdRepo(bookingId);
  if (!booking) throw new Error("Booking not found!");
  if (booking.customer_id !== user.id)
    throw new Error("You cannot cancel this booking!");
  if (new Date() >= new Date(booking.rent_start_date))
    throw new Error("Cannot cancel after start date");

  // Update booking status
  const cancelled = await updateBookingStatusRepo(bookingId, "cancelled");

  // Update vehicle to available
  await updateVehicleById(booking.vehicle_id, {
    availability_status: "available",
  });

  return cancelled;
};

export const returnVehicle = async (bookingId: number) => {
  const booking = await getBookingByIdRepo(bookingId);
  if (!booking) throw new Error("Booking not found!");

  // Update booking status
  const returned = await updateBookingStatusRepo(bookingId, "returned");

  // Update vehicle to available
  await updateVehicleById(booking.vehicle_id, {
    availability_status: "available",
  });

  return returned;
};
