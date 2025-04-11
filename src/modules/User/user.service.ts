import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Department } from '../Department/department.model';
import { Shift } from '../Seasonal_Data/seasonal.date.model';
import { generateUserId } from '../Admin/admin.utils';
import { TPublisher } from '../Publisher/publisher.interface';
import { Publisher } from '../Publisher/publisher.model';

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

  // department exists
  const departmentExists = await Department.findById(payload.department);

  if (!departmentExists) {
    throw new AppError(status.NOT_FOUND, 'Department is not found');
  }

  // shift data
  const seasonalDataExists = await Shift.findById(payload.seasonalDate);

  if (!seasonalDataExists) {
    throw new AppError(status.NOT_FOUND, 'seasonal data is not found');
  }

  //   session start
  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // session

    // id generated

    userData.id = await generateUserId(seasonalDataExists);

    if (file) {
      const imageName = `${payload?.name?.lastName}`;
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

const createPublisherIntoDB = async (
  file: any,
  password: string,
  payload: TPublisher,
) => {
  const userData: Partial<TUser> = {};
  // set password
  userData.password = password || (config.default_password as string);

  // set role email
  userData.role = 'publisher';
  userData.email = payload.email;

  // department exists
  const departmentExists = await Department.findById(payload.department);

  if (!departmentExists) {
    throw new AppError(status.NOT_FOUND, 'Department is not found');
  }

  // shift data
  const seasonalDataExists = await Shift.findById(payload.seasonalDate);

  if (!seasonalDataExists) {
    throw new AppError(status.NOT_FOUND, 'seasonal data is not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateUserId(seasonalDataExists);

    if (file) {
      const imageName = `${payload?.name?.lastName}`;
      const path = file.path;
      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);

      payload.profileImage = secure_url as string;
    }

    // user create

    const newUser = await UserModel.create([userData], { session }); /// send array

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Fail To Create User');
    }
    // set id and userid intu payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newPublisher = await Publisher.create([payload], { session });
    if (!newPublisher.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create  Publisher');
    }

    await session.commitTransaction();
    await session.endSession();
    return newPublisher;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createAdminIntoDB,
  createPublisherIntoDB,
};
