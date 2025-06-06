import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { status } from 'http-status';
import { UserServices } from './user.service';
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const createPublisher = catchAsync(async (req, res) => {
  const { password, publisher: publisherData } = req.body;
  const result = await UserServices.createPublisherIntoDB(
    req.file,
    password,
    publisherData,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Publisher is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createPublisher,
};
