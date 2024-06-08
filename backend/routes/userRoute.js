const router = require('express').Router();
const verify = require('../Middlewares/verifyToken');
const userController = require('../controllers/userController');

// Récupérer tous les utilisateurs (admin seulement)
router.get('/', verify, userController.getAllUsers);

// Récupérer un utilisateur par son ID (admin seulement)
router.get('/:id', verify, userController.getUserById);

// Récupérer un utilisateur par son nom (admin seulement)
router.get('/name/:name', verify, userController.findByName);

// Mettre à jour un utilisateur (admin seulement)
router.put('/:id', verify, userController.updateUser);

// Mettre à jour le mot de passe d'un utilisateur (admin ou utilisateur)
router.put('/:id/password', verify, userController.updatePassword);

// Mettre à jour le nom d'utilisateur (admin ou utilisateur)
router.put('/:id/prenom', verify, userController.updateUsername);

// Supprimer un utilisateur (admin seulement)
router.delete('/:id', verify, userController.deleteUser);

// Récupérer les informations de l'utilisateur connecté
router.get('/me', verify, userController.getCurrentUser);

module.exports = router;
