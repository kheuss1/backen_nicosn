const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const formRoutes =require("./routes/formRoutes")
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/auth');
const cors = require("cors");



dotenv.config();

const app = express();
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);
const PORT = process.env.PORT || 5000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'API pour mon application React',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.js'], // chemin vers les fichiers où se trouvent vos routes
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", formRoutes);

// Connexion à MongoDB
/*mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(err);
});*/

// Route de base
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/user', authRoutes);
app.use('/api/users', userRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


