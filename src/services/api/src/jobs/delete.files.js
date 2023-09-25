const fs = require('fs');
const path = require('path');
const moment = require('moment');

const directoryPath = path.join(__dirname, '../', 'storage', 'files');
const deleteFiles = () => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return;
    }
    files.forEach((file) => {
      const timestamp = parseInt(file.replace(/,/g, ''), 10);
      const date = new Date(timestamp);
      if (!(moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'))) {
        fs.unlinkSync(path.join(__dirname, '../', 'storage', 'files', file));
      }
    });
  });
};

module.exports = {
  deleteFiles,
};
