import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminIntoDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin are retrieve successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
};
