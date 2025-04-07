import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdminIntoDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;

  const meta = await adminQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const AdminServices = {
  getAllAdminIntoDB,
};
