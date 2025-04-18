import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category is created successfully',
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategory();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category are retrieved successfully',
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.getSingleCategory(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category is retrieved successfully',
    data: result,
  });
});
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.updateCategory(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category is update successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
};
