const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/register', adminController.createAdmin);
router.post('/login', adminController.login);
router.get('/', authMiddleware, adminController.getAdmins);
router.delete('/:id', authMiddleware, adminController.deleteAdmin);

module.exports = router;