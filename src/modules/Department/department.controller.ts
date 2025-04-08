import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DepartmentServices } from './department.service';


const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartment(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department is created successfully',
    data: result,
  });
});
const getAllDepartment = catchAsync(async (req, res) => {

  const result = await DepartmentServices.getAllDepartment();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: '',
    data: result,
  });
});
const getSingleDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getSingleDepartment();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: '',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.updateDepartment();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: '',
    data: result,
  });
});

export const DepartmentControllers = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
