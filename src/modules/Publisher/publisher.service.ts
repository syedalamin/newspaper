import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { PublisherSearchableFields } from './publisher.constant';
import { TPublisher } from './publisher.interface';
import { Publisher } from './publisher.model';

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

export const PublisherServices = {
  getPublisher,
  getSinglePublisher,
  updatePublisher,
};
