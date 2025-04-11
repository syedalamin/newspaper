import { TShift } from '../Seasonal_Data/seasonal.date.interface';
import { UserModel } from '../User/user.model';

const findLastUserId = async () => {
  const lastUser = await UserModel.findOne(
    {},
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id ? lastUser.id : undefined;
};

export const generateUserId = async (payload: TShift) => {
  let currentId = (0).toString();

  const lastUserId = await findLastUserId();

  const lastSeasonalYear = lastUserId?.substring(0, 4);
  const lastSeasonalCode = lastUserId?.substring(4, 6);

  const currentSeasonalYear = payload?.year;
  const currentSeasonalCode = payload?.code;

  if (
    lastSeasonalCode &&
    lastSeasonalYear === currentSeasonalYear &&
    lastSeasonalCode === currentSeasonalCode
  ) {
    currentId = lastUserId?.substring(6) || '0';
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
