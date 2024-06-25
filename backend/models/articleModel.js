const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    texte: { type: String, required: true },
    cheminImage: { type: String, required: true },
    idAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);