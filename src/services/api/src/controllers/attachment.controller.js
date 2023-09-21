const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { attachmentService } = require('../services');

const createAttachment = catchAsync(async (req, res) => {
  const attachableIdIsTaken = await attachmentService.getAttachmentByAttachableIdAndType(
    req.body.attachableId,
    req.body.type,
    req.body.attribute
  );

  if (attachableIdIsTaken) throw new ApiError(httpStatus.NOT_FOUND, 'Attachable Id taken');

  const attachment = await attachmentService.createAttachment(req.body);

  res.status(httpStatus.CREATED).send(attachment);
});

const getAttachment = catchAsync(async (req, res) => {
  const attachment = await attachmentService.getAttachmentByAttachableIdAndType(
    req.params.attachableId,
    req.query.type,
    req.query.attribute
  );
  if (!attachment) throw new ApiError(httpStatus.NOT_FOUND, 'Attachment Not Found');
  res.status(httpStatus.OK).send(attachment);
});

// const getAttachments = catchAsync(async (req, res) => {
//   const attachment = await attachmentService.getAttachments();
//   res.status(httpStatus.OK).send(attachment);
// });

const updateAttachment = catchAsync(async (req, res) => {
  const attachment = await attachmentService.getAttachmentById(req.params.attachmentId);
  if (!attachment) throw new ApiError(httpStatus.NOT_FOUND, 'Attachment Not Found');

  console.log(req.body.photo);
  if (req.body.photo == 'undefined' || !req.body.photo) req.body.photo = '';
  const results = await attachmentService.updateAttachment(attachment, req.body);
  res.status(httpStatus.CREATED).send(results);
});

const deleteAttachment = catchAsync(async (req, res) => {
  const attachment = await attachmentService.getAttachmentById(req.params.attachmentId);
  if (!attachment) throw new ApiError(httpStatus.NOT_FOUND, 'Attachment Not Found');
  await attachmentService.deleteAttachment(attachment);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAttachment,
  getAttachment,
  updateAttachment,
  deleteAttachment,
};
