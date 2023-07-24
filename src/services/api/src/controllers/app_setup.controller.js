const educationalYearControler = require('./educationalYear.controller');
const userControler = require('./user.controller');
// Mock database
let users = [];

// Function to insert users into the database
function insertUsersIntoDatabase(userArray) {
  // Assuming you have the necessary database logic to insert the users
  // Implement your logic here
  users = userArray;
}

// Function to create educational years
function createEducationalYears(currentYear) {
  for (let i = 0; i < 4; i++) {
    educationalYearControler.createEducationalYear(currentYear + i)
  }
  console.log('Educational years created:', educationalYears);
}

// Controller function for creating users
function createUser(req, res) {
  const { currentEducationalYear } = req.body;
  const { accounts } = req.body;
  createEducationalYears(createEducationalYears)
  // const { error } = validateUser(req.body);

  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }
  for (account in accounts){
    console.log(account)
    userControler.createUser(account)
  }
  // Assuming you have a function to insert the users into the database, you can do something like this:
  // insertUsersIntoDatabase(req.body);

  // Update the users array with the new users
  users = req.body;

  // Assuming you have a function to create the educational years, you can do something like this:

console.log("yesaer")

  res.status(200).json({ message: 'Users created successfully.' });
}

module.exports = {
  createUser,
};
