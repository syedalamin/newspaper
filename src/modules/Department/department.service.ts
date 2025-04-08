import { TDepartment } from './department.interface';
import { Department } from './department.model';

import QueryBuilder from '../../builder/QueryBuilder';
import { departmentSearchableFields } from './department.constant';

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

const updateDepartment = async () => {};

export const DepartmentServices = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
