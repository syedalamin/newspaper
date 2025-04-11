import status from 'http-status';
import AppError from '../../errors/AppError';
import {
  ShiftNameCodeMapper,
  ShiftSearchableFields,
} from './seasonal.data.constant';
import { TShift } from './seasonal.date.interface';
import { Shift } from './seasonal.date.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createShift = async (payload: TShift) => {
  if (ShiftNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(status.BAD_REQUEST, 'Invalid shift code');
  }

  const shiftExists = await Shift.findOne({
    name: payload.name,
    year: payload.year,
  });

  if (shiftExists) {
    throw new AppError(status.BAD_REQUEST, 'Semester Already exists');
  }

  const result = await Shift.create(payload);

  return result;
};

const getAllShift = async (query: Record<string, unknown>) => {
  const shiftQuery = new QueryBuilder(Shift.find(), query)
    .search(ShiftSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await shiftQuery.modelQuery;
  const meta = await shiftQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleShift = async (id: string) => {
  const result = await Shift.findById(id);

  return result;
};

const updateShift = async (id: string, payload: TShift) => {
  const result = await Shift.findByIdAndUpdate(id, payload, {new: true});
  return result;
};

export const ShiftServices = {
  createShift,
  getAllShift,
  getSingleShift,
  updateShift,
};
