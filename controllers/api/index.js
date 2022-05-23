const require = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const { Router } = require('express');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;