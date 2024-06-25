const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../Middlewares/authMiddleware');
const uploadMiddleware = require('../Middlewares/uploadMiddleware');

router.post('/', authMiddleware, uploadMiddleware.single('image'), articleController.createArticle);
router.get('/', articleController.getArticles);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;