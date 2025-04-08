import QueryBuilder from '../../builder/QueryBuilder';
import { PositionSearchableFields } from './position.constant';
import { TPosition } from './position.interface';
import { Position } from './position.model';

const createPosition = async (payload: TPosition) => {
  const result = await Position.create(payload);
  return result;
};

const getAllPosition = async (query: Record<string, unknown>) => {
  const positionQuery = new QueryBuilder(Position.find(), query)
    .search(PositionSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await positionQuery.modelQuery;
  const meta = await positionQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSinglePosition = async (id: string) => {
  const result = await Position.findById(id);
  return result;
};

const updatePosition = async (id: string, payload: Partial<TPosition>) => {
  const result = await Position.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const PositionServices = {
  createPosition,
  getAllPosition,
  getSinglePosition,
  updatePosition,
};
