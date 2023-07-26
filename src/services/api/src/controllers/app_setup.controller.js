const educationalYearControler = require('./educationalYear.controller');
const userControler = require('./user.controller');


function createEducationalYears(currentYear) {
  for (let i = 0; i < 4; i++) {
    educationalYearControler.createEducationalYear(currentYear + i)
  }
  console.log('Educational years created:', educationalYears);
}


function createUser(req, res) {
  const { currentEducationalYear } = req.body;
  const { accounts } = req.body;
  createEducationalYears(currentEducationalYear)

  for (account in accounts){
    console.log(account)
    userControler.createUser(account)
  }
  users = req.body;

console.log("yesaer")

  res.status(200).json({ message: 'Users created successfully.' });
}

module.exports = {
  createUser,
};
