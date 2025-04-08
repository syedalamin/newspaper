import { TDepartment } from './department.interface';
import { Department } from './department.model';

import QueryBuilder from '../../builder/QueryBuilder';
import { departmentSearchableFields } from './department.constant';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createDepartment = async (payload: TDepartment) => {
  const result = await Department.create(payload);

  return result;
};

const getAllDepartment = async (query: Record<string, unknown>) => {
  const departmentQuery = new QueryBuilder(Department.find(), query)
    .search(departmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await departmentQuery.countTotal();
  const result = await departmentQuery.modelQuery;
  return {
    meta,
    result,
  };
};
const getSingleDepartment = async (id: string) => {
  const result = await Department.findById(id);

  return result;
};

const updateDepartment = async (id: string, payload: Partial<TDepartment>) => {
  const { positions, ...departmentRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // base department update
    const updatedBaseDepartmentInfo = await Department.findByIdAndUpdate(
      id,
      departmentRemainingData,
      { new: true, runValidators: true },
    );

    if (!updatedBaseDepartmentInfo) {
      throw new AppError(status.BAD_REQUEST, 'Failed to update department');
    }

    if (positions && positions.length) {
      // filter out the deleted fields

      const deletedPosition = positions
        .filter(el => el.name && el.isDeleted)
        .map(el => el.name);

      const deletedRequestedPosition = await Department.findByIdAndUpdate(
        id,
        {
          $pull: {
            positions: { name: { $in: deletedPosition } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedRequestedPosition) {
        throw new AppError(status.BAD_REQUEST, 'Failed to update position');
      }

      // filter out the new position fields

      const newPosition = positions.filter(el => el.name && !el.isDeleted);

      const newRequestPosition = await Department.findByIdAndUpdate(
        id,
        {
          $addToSet: { positions: { $each: newPosition } },
        },
        { new: true, runValidators: true, session },
      );

      if (!newRequestPosition) {
        throw new AppError(status.BAD_REQUEST, 'Failed to update Position');
      }
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await Department.findById(id).populate('positions');
  
    return result;

  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
 


};

export const DepartmentServices = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
