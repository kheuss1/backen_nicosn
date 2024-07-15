// routes/articleRoutes.js
const express = require('express');
const multer = require('multer');
const articleController = require('../controllers/articleController');
const authMiddleware = require('../Middlewares/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/articles', authMiddleware, upload.single('image'), articleController.createArticle);
router.get('/articles/:id', authMiddleware, articleController.getArticle);
router.delete('/articles/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
