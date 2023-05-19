const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './src/images');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + Math.floor(Math.random() * 1000000) + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/JPG' ||
    file.mimetype === 'image/PNG' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/JPEG'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    // Max Size of Image 2mb
    fileSize: 2048000,
  },
});

module.exports = upload;
