import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PublisherServices } from './publisher.service';

const getPublisher = catchAsync(async (req, res) => {
  const result = await PublisherServices.getPublisher(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Publisher are retrieve successfully',
    data: result,
  });
});

const getSinglePublisher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PublisherServices.getSinglePublisher(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Publisher is retrieve successfully',
    data: result,
  });
});
const updatePublisher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { publisher } = req.body;
  const result = await PublisherServices.updatePublisher(
    req.file,
    id,
    publisher,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Publisher is updated successfully',
    data: result,
  });
});

export const PublisherControllers = {
  getPublisher,
  getSinglePublisher,
  updatePublisher,
};
