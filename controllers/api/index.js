const router = require('express').Router();

const userRoutes = require('./userRoutes');
// const homeRoutes = require('./home-routes');

router.use('/user', userRoutes);
// router.use('/api', apiRoutes);

const postRoutes = require('./postRoutes');

router.use('/post', postRoutes);

const commentRoutes = require('./commentRoutes');

router.use('/comment', commentRoutes);

module.exports = router;
