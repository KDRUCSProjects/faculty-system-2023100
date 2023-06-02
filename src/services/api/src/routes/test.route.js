// This is an environment where you are free to test your code.
// Use this route to ignore routes Joi validation, and try out new things quickly.
// You are free to clear everything out here. But it's recommended that you create separate route path
// for your own testing. Happy Coding! :)
// ---------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();
const { Subject } = require('../models');

// Create department, get, update and delete a department
router.post('/createSub', async (req, res) => {
  try {
    const newSub = await Subject.create({ name: 'Math', semesterId: 1 });
    res.send(newSub);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
