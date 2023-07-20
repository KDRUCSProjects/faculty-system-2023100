const attachImageToBody = (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.path.split('\\')[3];
  }
  return next();
};

const attachAttachment = (req, res, next) => {
  if (req.file) {
    req.body.attachment = req.file.path.split('\\')[3];
  }
  return next();
};

module.exports = { attachImageToBody, attachAttachment };
