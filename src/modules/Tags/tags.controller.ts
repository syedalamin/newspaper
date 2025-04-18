import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TagsServices } from './tags.service';

const createTags = catchAsync(async (req, res) => {
  const result = await TagsServices.createTags(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Tags is created successfully',
    data: result,
  });
});
const getAllTags = catchAsync(async (req, res) => {
  const result = await TagsServices.getAllTags();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Tags are retrieved successfully',
    data: result,
  });
});
const getSingleTags = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TagsServices.getSingleTags(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Tags is retrieved successfully',
    data: result,
  });
});
const updateTags = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TagsServices.updateTags(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Tags is update successfully',
    data: result,
  });
});

export const TagsControllers = {
  createTags,
  getAllTags,
  getSingleTags,
  updateTags,
};
