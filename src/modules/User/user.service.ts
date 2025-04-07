import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<TUser> = {};

  //   set password
  userData.password = password || (config.default_password as string);

  //   set role email
  userData.role = 'admin';
  userData.email = payload.email;

  //   session start
  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // session

    userData.id = 'admin123';

    if (file) {
      const imageName = `${payload?.name?.firstName}`;
      const path = file.path;

      // sent image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImage = secure_url as string;
    }

    // create a user
    const newUser = await UserModel.create([userData], { session }); // array

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Fail To Create User');
    }
    // set id and userId into  payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    const newAdmin = await Admin.create([payload], { session }); // array
    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create  admin');
    }

    await session.commitTransaction(); // commit
    await session.endSession(); // end
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction(); // abort
    await session.endSession(); // end
    throw new Error(err);
  }
};

export const UserServices = {
  createAdminIntoDB,
};
