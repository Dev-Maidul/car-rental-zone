import { Request, Response } from 'express';
import {
  addVehicle,
  listVehicles,
  findVehicle,
  modifyVehicle,
  removeVehicle,
} from './vehicle.service';

// POST create vehicle
export const createVehicleController = async (req: Request, res: Response) => {
  const vehicle = await addVehicle(req.body);
  res.status(201).json({ success: true, data: vehicle });
};

// GET all vehicles
export const getVehiclesController = async (req: Request, res: Response) => {
  const vehicles = await listVehicles();
  res.json({ success: true, data: vehicles });
};

// GET single vehicle
export const getVehicleController = async (req: Request, res: Response) => {
  const id = Number(req.params.vehicleId);
  const vehicle = await findVehicle(id);

  if (!vehicle) {
    return res
      .status(404)
      .json({ success: false, message: 'Vehicle not found' });
  }

  res.json({ success: true, data: vehicle });
};

// PUT update vehicle
export const updateVehicleController = async (req: Request, res: Response) => {
  const id = Number(req.params.vehicleId);
  const updatedVehicle = await modifyVehicle(id, req.body);
  res.json({ success: true, data: updatedVehicle });
};

// DELETE vehicle
export const deleteVehicleController = async (req: Request, res: Response) => {
  const id = Number(req.params.vehicleId);
  await removeVehicle(id);

  res.json({ success: true, message: 'Vehicle deleted successfully' });
};
