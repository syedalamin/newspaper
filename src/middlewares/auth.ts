import status from 'http-status';
import AppError from '../errors/AppError';
import { TRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../modules/Auth/auth.utils';
import config from '../config';
import { UserModel } from '../modules/User/user.model';
import { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }

    let decoded;

    try {
      decoded = verifyToken(token, config.jwt_access_secret as string);
    } catch (err) {
      throw new AppError(status.UNAUTHORIZED, 'Unauthorized');
    }

    const { userId, role, iat } = decoded;

    const user = await UserModel.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(status.FORBIDDEN, 'This user is deleted !');
    }

    const userStatus = user?.status;

    if (userStatus === 'suspended') {
      throw new AppError(status.FORBIDDEN, 'This user is blocked ! !');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
