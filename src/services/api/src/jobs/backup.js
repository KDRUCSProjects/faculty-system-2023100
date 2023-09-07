const path = require('path');
const fs = require('fs');
const os = require('os');
const mysqldump = require('mysqldump');
let moment = require('moment');

let documentsDir = path.join(os.homedir(), './Documents/Faculty MS');

// Check if dir exists, otherwise create one
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir);
}

let todaysDate = moment().format('YYYY-MM-DD');

// dump the result straight to a file

const createDBBackup = async (customBackup = false) => {
  try {
    let isThursday = moment().weekday() == 4 ? true : false;

    // Only do backups on Thursday
    if (!isThursday && !customBackup) return false;

    if (fs.existsSync(path.join(documentsDir, `${todaysDate}-fmsBackup.sql`)) && !customBackup) {
      console.log('DB Backup exists for today!');
      return false;
    }

    if (customBackup) {
      todaysDate = moment().format('YYYY-MM-DD HH-mm-ss');
    }

    let result = await mysqldump({
      connection: {
        host: process.env.DB_DEV_HOST || process.env.DB_HOST,
        user: process.env.DB_DEV_USER || process.env.DB_USER,
        password: process.env.DB_DEV_PASS || process.env.DB_PASS,
        database: process.env.DB_DEV_NAME || process.env.DB_NAME,
        charset: 'utf8_general_ci',
      },
      dumpToFile: path.join(documentsDir, `${todaysDate}-fmsBackup.sql`),
    });

    console.log('DB backup successfully done!');
  } catch (e) {
    console.log('Failed creating db backup');
  }
};

module.exports = { createDBBackup };
