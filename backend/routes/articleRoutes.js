// routes/articleRoutes.js
const express = require('express');
const multer = require('multer');
const articleController = require('../controllers/articleController');
const router = express.Router();

// Configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/articles', upload.single('image'), articleController.createArticle);
router.get('/articles/:id', articleController.getArticle);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;


