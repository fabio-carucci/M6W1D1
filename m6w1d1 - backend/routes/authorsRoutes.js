const express = require('express');
const router = express.Router();
const { getAuthors, getAuthorById, createAuthor, updateAuthorById, deleteAuthor } = require('../controllers/authorsController');

// Definizione delle route
router
    .get('/authors', getAuthors) // Route GET per ottenere la lista degli autori
    .get('/authors/:id', getAuthorById) // Route GET per ottenere un singolo autore per ID
    .post('/authors', createAuthor) // Route POST per creare un nuovo autore
    .put('/authors/:id', updateAuthorById) // Route PUT per aggiornare un singolo autore per ID
    .delete('/authors/:id', deleteAuthor); // Route DELETE per eliminare un singolo autore per ID

module.exports = router;