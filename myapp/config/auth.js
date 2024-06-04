const bcrypt = require('bcrypt');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = function(app, sequelize) {
  // Configure sessions
  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: sequelize
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 } // 30 minutes
  }));

  // Add a middleware to check for logged-in users
  app.use((req, res, next) => {
    if (!req.session.user && req.url !== '/login' && req.url !== '/signup') {
      res.redirect('/login');
    } else {
      next();
    }
  });

  // Add a middleware to expose the logged-in user to the views
  app.use((req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    }
    next();
  });
};