const express = require('express');
const router = express.Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// POST register a new user
router.post('/signup', async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.email = newUser.email;
      req.session.loggedIn = true;
  
        res.status(200).json(newUser);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // GET login page
  router.get('/login', (req, res) => {
    // Render the login page using the "login" template
    res.render('login', {
      // Optional: Pass data to the template, for example:
      title: 'Login Page'
    });
  });
  
 // POST login
router.post('/login', async (req, res) => {
  try {
    console.log('Attempting to find user by email:', req.body.email);
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    console.log('Checking password validity for user:', user.id);
    const validPassword = await user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    console.log('Saving session for user:', user.id);
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user: user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
  // POST logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;