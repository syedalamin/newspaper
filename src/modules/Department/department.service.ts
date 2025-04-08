import status from 'http-status';
import AppError from '../../errors/AppError';
import { Position } from '../Position/position.model';
import { TDepartment } from './department.interface';
import { Department } from './department.model';

const createDepartment = async (payload: TDepartment) => {

  const positionExists = await Position.findById(payload.position)

  if(!positionExists){
    throw new AppError(status.NOT_FOUND,'Position is not exists')
  }

  const result = await Department.create(payload);
  return result;
};

const getAllDepartment = async () => {};

const getSingleDepartment = async () => {};

const updateDepartment = async () => {};

export const DepartmentServices = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
