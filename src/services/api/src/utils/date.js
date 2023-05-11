const moment = require('moment');

const toStandardDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

const toMysqlFormat = (date = new Date()) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

module.exports = {
  toStandardDate,
  toMysqlFormat,
};
