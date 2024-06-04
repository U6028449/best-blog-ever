// Import the necessary modules
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../config/auth');

// Define a route for the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database, including the associated user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Map over the postData to serialize it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage view with the posts data and a logged_in flag
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // If there's an error, respond with a 500 status
    res.status(500).json(err);
  }
});

// Define a route for the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect them to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the login view
  res.render('login');
});

// Export the router
module.exports = router;