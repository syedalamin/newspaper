import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import AppError from '../../errors/AppError';

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
    message: 'Password is Change successfully!',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const {refreshToken} = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'refresh Password is updated successfully!',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const {id}= req.body
  const result = await AuthServices.forgetPassword(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'forget Password ',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(status.BAD_REQUEST, 'Something went wrong !');
  }

  const result = await  AuthServices.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'reset Password ',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
};
