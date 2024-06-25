const express = require('express');
const router = express.Router();

const formRoutes = require('./formRoutes');
const adminRoutes = require('./adminRoutes');
const articleRoutes = require('./articleRoutes');

router.use('/form', formRoutes);
router.use('/admin', adminRoutes);
router.use('/articles', articleRoutes);

module.exports = router;
