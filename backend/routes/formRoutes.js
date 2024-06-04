/**
 * @swagger
 * /formulaire:
 *   get:
 *     description: envoie les formulaire
 *     responses:
 *       200:
 *         description: Succès
 */
const formControllers = require ("../controllers/formControllers");
const express = require('express');
const router = require("express").Router();

router.post("/contact", formControllers.formContact);
// Route pour le formulaire de renseignement
router.post('/renseignement', formControllers.renseignement);

// Route pour prendre un rendez-vous
router.post('/rendezvous', formControllers.rendezvous);
module.exports = router;