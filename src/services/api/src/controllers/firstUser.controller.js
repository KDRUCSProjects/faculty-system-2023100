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
  const educationalYears = [];
  for (let i = 0; i < 4; i++) {
    educationalYears.push(currentYear - i);
  }

  // Assuming you have the necessary database logic to create the educational years
  // Implement your logic here

  console.log('Educational years created:', educationalYears);
}

// Controller function for creating users
function createUser(req, res) {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Assuming you have a function to insert the users into the database, you can do something like this:
  insertUsersIntoDatabase(req.body);

  // Update the users array with the new users
  users = req.body;

  // Assuming you have a function to create the educational years, you can do something like this:
  const { currentEducationalYear } = req.body;
  createEducationalYears(currentEducationalYear);

  res.status(200).json({ message: 'Users created successfully.' });
}

module.exports = {
  createUser,
};
