import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);
  const { accessToken, refreshToken, needPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword

};
