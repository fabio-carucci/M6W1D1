const express = require('express');
const router = express.Router();
const { getAuthors, getAuthorById, createAuthor } = require('../controllers/authorsController');

// Definizione delle route per ottenere la lista degli autori, ottenere un singolo autore per ID e creare un nuovo autore
router
    .get('/authors', getAuthors) // Route GET per ottenere la lista degli autori
    .get('/authors/:id', getAuthorById) // Route GET per ottenere un singolo autore per ID
    .post('/authors', createAuthor); // Route POST per creare un nuovo autore

module.exports = router;
