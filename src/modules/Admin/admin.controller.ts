import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin are retrieve successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is retrieve successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  const result = await AdminServices.updateAdminIntoDB(req.file, id, admin);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminIntoDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});
export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
