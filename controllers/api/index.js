const router = require('express').Router();
const userRoutes = require('./userRoutes');
const pageRoutes = require('./pageRoutes');

router.use('/users', userRoutes);
router.use('/page', pageRoutes);

module.exports = router;