import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShiftServices } from './seasonal.date.service';

const createShift = catchAsync(async (req, res) => {
  const result = await ShiftServices.createShift(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Shift is Created successfully',
    data: result,
  });
});
const getAllShift = catchAsync(async (req, res) => {
  const result = await ShiftServices.getAllShift(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Shift are retrieved successfully',
    data: result,
  });
});
const getSingleShift = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShiftServices.getSingleShift(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Shift is retrieved successfully',
    data: result,
  });
});
const updateShift = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShiftServices.updateShift(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Shift is updated successfully',
    data: result,
  });
});

export const ShiftControllers = {
  createShift,
  getAllShift,
  getSingleShift,
  updateShift,
};
