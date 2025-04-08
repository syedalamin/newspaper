import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PositionServices } from './position.service';

const createPosition = catchAsync(async (req, res) => {
  const result = await PositionServices.createPosition();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: '',
    data: result,
  });
});
const getAllPosition = catchAsync(async (req, res) => {
  const result = await PositionServices.getAllPosition();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: '',
    data: result,
  });
});
const getSinglePosition = catchAsync(async (req, res) => {
  const result = await PositionServices.getSinglePosition();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: '',
    data: result,
  });
});
const updatePosition = catchAsync(async (req, res) => {
  const result = await PositionServices.updatePosition();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: '',
    data: result,
  });
});

export const PositionControllers = {
  createPosition,
  getAllPosition,
  getSinglePosition,
  updatePosition,
};
