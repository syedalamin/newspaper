import status from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import { SignOptions } from 'jsonwebtoken';

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'This user is deleted !');
  }

  const userStatus = user?.status;

  if (userStatus === 'suspended') {
    throw new AppError(status.FORBIDDEN, 'This user is suspended !');
  }

  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      user?.password as string,
    ))
  ) {
    throw new AppError(status.FORBIDDEN, 'Password do not match!');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions['expiresIn'],
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions['expiresIn'],
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needsPasswordChanged,
  };
};

export const AuthServices = {
  loginUserIntoDB,
};
