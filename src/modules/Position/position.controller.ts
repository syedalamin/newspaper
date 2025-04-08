import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PositionServices } from './position.service';

const createPosition = catchAsync(async (req, res) => {
  const result = await PositionServices.createPosition(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Position is created successfully ',
    data: result,
  });
});
const getAllPosition = catchAsync(async (req, res) => {
  const result = await PositionServices.getAllPosition(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Position are retrieved successfully ',
    data: result,
  });
});
const getSinglePosition = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PositionServices.getSinglePosition(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Position is retrieved successfully ',
    data: result,
  });
});
const updatePosition = catchAsync(async (req, res) => {
    const { id } = req.params;
  const result = await PositionServices.updatePosition(id, req.body);

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
