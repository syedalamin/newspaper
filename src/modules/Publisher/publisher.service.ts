import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { PublisherSearchableFields } from './publisher.constant';
import { TPublisher } from './publisher.interface';
import { Publisher } from './publisher.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { UserModel } from '../User/user.model';

const getPublisher = async (query: Record<string, unknown>) => {
  const publisherQuery = new QueryBuilder(Publisher.find(), query)
    .search(PublisherSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await publisherQuery.modelQuery;
  const meta = await publisherQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSinglePublisher = async (id: string) => {
  const result = await Publisher.findById(id);

  return result;
};

const updatePublisher = async (
  file: any,
  id: string,
  payload: Partial<TPublisher>,
) => {
  const { name, guardian, profileImage, ...remainingPublisherData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingPublisherData,
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
    const publisherId = await Publisher.findById(id).select('id -_id').lean();

    const imageName = publisherId?.id;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(
      imageName as string,
      path,
    );

    modifiedUpdatedData.profileImage = secure_url as string;
  }

  const result = await Publisher.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deletePublisher = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedPublisherData = await Publisher.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true, session },
    );

    if (!deletedPublisherData) {
      throw new AppError(
        status.BAD_REQUEST,
        'Failed to deleted Publisher Data',
      );
    }

    const userId = deletedPublisherData?.user;
    const deletedUser = await UserModel.findByIdAndUpdate(userId, {
      isDeleted: true,
    });

    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, 'Failed to deleted User Data');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedPublisherData
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const PublisherServices = {
  getPublisher,
  getSinglePublisher,
  updatePublisher,
  deletePublisher,
};
