const express = require('express');

const mime = require('mime');
const app = express();
const xl = require('excel4node');

const router = express.Router();

const headerColumns = ['ID', 'Name', 'lastName'];

const data = [
  { ID: 1, name: 'jan', Lastname: 'ahmadi' },
  { ID: 2, name: 'nabi', Lastname: 'noori' },
];

const createExcelFile = () => {
  const wb = new xl.workbook();
  const ws = wb.addworksheet('studentlsit');
  let colIndex = 1;
  headerColumns.forEach((item) => {
    ws.cell(1, colIndex++).string(item);
  });
  let rowIndex = 2;
  data.forEach((item) => {
    let columnIndex = 1;
    Object.keys(item).forEach((colName) => {
      ws.cell(rowIndex, columnIndex++).string(item[colName]);
    });
    rowIndex++;
  });
  wb.write('students.xlsx');
};

router.get('/ExcelExport', (req, res, next) => {
  createExcelFile();
  const file = __dirname + 'students.xlsx';
  const filename = path.basename(file);
  const mimeType = mime.getType(file);
  res.setHeader('Content-Disposition', 'attachment;filename' + filename);
  res.setHeader('Content-Type', mimeType);
  setTimeout(() => {
    res.download(file);
  }, 2000);
});
module.exports = router;
