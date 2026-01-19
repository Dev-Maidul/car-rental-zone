import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
} from './vehicle.repository';

export const addVehicle = async (data: any) => {
  return createVehicle(data);
};

export const listVehicles = async () => {
  return getAllVehicles();
};

export const findVehicle = async (id: number) => {
  return getVehicleById(id);
};

export const modifyVehicle = async (id: number, data: any) => {
  return updateVehicleById(id, data);
};

export const removeVehicle = async (id: number) => {
  return deleteVehicleById(id);
};
