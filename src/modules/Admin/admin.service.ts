import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { UserModel } from '../User/user.model';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
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

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};
const updateAdminIntoDB = async (
  file: any,
  id: string,
  payload: Partial<TAdmin>,
) => {
  const { name, guardian, profileImage, ...remainingAdminData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (file) {
    const adminId = await Admin.findById(id).select('id -_id').lean();
    const imageName = adminId?.id;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(
      imageName as string,
      path,
    );

    modifiedUpdatedData.profileImage = secure_url as string;
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAdminIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deletedAdmin) {
      throw new AppError(status.BAD_REQUEST, 'Failed to deleted Admin Data');
    }

    // get user _id from deleted admin
    const userId = deletedAdmin?.user;

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, 'Failed to deleted User Data');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.FORBIDDEN, err);
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminIntoDB,
};
