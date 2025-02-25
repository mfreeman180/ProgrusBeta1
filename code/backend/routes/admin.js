const express = require('express');
const router = express.Router();
const User = require('../models/user');

const isAdmin = (req, res, next) => {
  // Placeholder for admin authentication logic
  next();
};

router.get('/dashboard', isAdmin, (req, res) => {
  res.sendFile('admin/index.html', { root: '.' });
});

router.get('/users', isAdmin, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;