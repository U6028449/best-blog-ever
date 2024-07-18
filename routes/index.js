const router = require('express').Router();
// const viewRoutes = require('./viewRoutes');
const apiRoutes = require('./api');
// const authRoutes = require('./authRoutes');
const homeRoutes = require('./homeRoutes');

// router.use('/', authRoutes);
// router.use('/', viewRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
module.exports = router;
