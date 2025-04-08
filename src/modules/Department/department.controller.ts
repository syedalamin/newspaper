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
  const result = await DepartmentServices.getAllDepartment(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department are retrieved successfully',
    data: result,
  });
});
const getSingleDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentServices.getSingleDepartment(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department is retrieved successfully',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentServices.updateDepartment(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department is updated successfully',
    data: result,
  });
});

export const DepartmentControllers = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
