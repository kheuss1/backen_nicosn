const Article = require('../models/articleModel');
const fs = require('fs');

exports.createArticle = async (req, res) => {
    const { titre, texte } = req.body;
    const cheminImage = req.file.path;
    const idAdmin = req.admin._id;

    try {
        const newArticle = new Article({ titre, texte, cheminImage, idAdmin });
        await newArticle.save();
        res.status(201).send(newArticle);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.send(articles);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article) {
            fs.unlinkSync(article.cheminImage);
            await article.remove();
            res.send({ message: 'Article deleted successfully' });
        } else {
            res.status(404).send('Article not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};