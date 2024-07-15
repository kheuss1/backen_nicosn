const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const multer = require('multer');
const authMiddleware = require('./Middlewares/authMiddleware');
const articleController = require('./controllers/articleController');

dotenv.config();

if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not defined in .env file');
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

// Configuration de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API pour mon application React',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuration de multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Démarrer le serveur après la connexion réussie à MongoDB
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

app.post('/api/articles', authMiddleware, upload.single('image'), articleController.createArticle);
app.get('/api/articles/:id', authMiddleware, articleController.getArticle);
app.delete('/api/articles/:id', authMiddleware, articleController.deleteArticle);

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
