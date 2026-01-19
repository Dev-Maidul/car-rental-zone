import { Router } from 'express';
import {
  createVehicleController,
  getVehiclesController,
  getVehicleController,
  updateVehicleController,
  deleteVehicleController,
} from './vehicle.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const vehicleRoutes = Router();

// Admin only
vehicleRoutes.post('/', authenticate, authorize('admin'), createVehicleController);
vehicleRoutes.put('/:vehicleId', authenticate, authorize('admin'), updateVehicleController);
vehicleRoutes.delete('/:vehicleId', authenticate, authorize('admin'), deleteVehicleController);

// Public
vehicleRoutes.get('/', getVehiclesController);
vehicleRoutes.get('/:vehicleId', getVehicleController);

export default vehicleRoutes;
