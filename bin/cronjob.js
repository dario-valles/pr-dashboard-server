#!/usr/bin/env node

const keys = require('../config/keys');
const mongoose = require('mongoose');
const axios = require('axios');
const Raven = require('raven');

require('../services/raven');
require('../models/User');
require('../models/Repository');
require('../models/Pullrequest');

const userController = require('../controllers/user.controller');
const repoController = require('../controllers/repo.controller');

const User = require('../models/User.js');

// Connect to MongoDB
mongoose.connect(keys.mongoURI);

async function cronjob() {
  // Fetch all repositories and store in DB
  const allUsers = await User.find();
  await allUsers.forEach(async user => {
    await userController.update(user);
    await repoController.update(user);
    await repoController.delete(user);
    await axios.post(`${keys.serverBaseUrl}/repos/socket`, user);
  });

  console.log('Cronjob successful finished!');
}

// Handle Promise rejection
process.on('unhandledRejection', err => {
  Raven.captureException(err, function() {
    process.exit(1);
  });

  console.log('Unhandled Rejection at:', err);
});

cronjob();
