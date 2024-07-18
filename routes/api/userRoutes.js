const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    console.log("======================================")
    console.log("/api/users route hit!")
    console.log(req.body)
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});



// // GET login page
// router.get('/login', (req, res) => {
//   // Render the login page using the "login" template
//   res.render('login', {
//     // Optional: Pass data to the template, for example:
//     title: 'Login Page'
//   });
// });

// // POST login
// router.post('/login', async (req, res) => {
//   console.log('Attempting to log in with email:', req.body.email); // Log the email attempting to log in
//   try {
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (!user) {
//       console.log('No user account found for email:', req.body.email); // Log if no user is found
//       res.status(400).json({ message: 'No user account found!' });
//       return;
//     }

//     const validPassword = await user.checkPassword(req.body.password);
//     if (!validPassword) {
//       console.log('Incorrect password for email:', req.body.email); // Log if the password is incorrect
//       res.status(400).json({ message: 'Incorrect password!' });
//       return;
//     }

//     req.session.save(() => {
//       console.log('User logged in:', req.session.username); // Log the username of the logged-in user
//       req.session.userId = user.id;
//       req.session.username = user.username;
//       req.session.loggedIn = true;

//       res.json({ user: user, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.error('Error during login:', err); // Log any errors that occur
//     res.status(500).json(err);
//   }
// });

// // POST logout
// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// // PUT update a user's profile (with authentication)
// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const userData = await User.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: 'No user found with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
