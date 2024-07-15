const Article = require('../models/articleModel');
const fs = require('fs');


exports.createArticle = async (req, res) => {
    const { titre, texte } = req.body;
    const idAdmin = req.admin._id;

    if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
    }

    const cheminImage = req.file.path;

    if (!titre || !texte) {
        return res.status(400).json({ error: 'Title and text are required' });
    }

    try {
        const newArticle = new Article({ titre, texte, cheminImage, idAdmin });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        if (fs.existsSync(cheminImage)) {
            fs.unlinkSync(cheminImage);
        }
        res.status(400).json({ error: 'Error creating article', details: err });
    }
};


exports.getArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving article', details: err });
    }
};

exports.deleteArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findByIdAndDelete(articleId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Supprimer le fichier image associé
        if (fs.existsSync(article.cheminImage)) {
            fs.unlinkSync(article.cheminImage);
        }

        res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression', details: err });
    }
};