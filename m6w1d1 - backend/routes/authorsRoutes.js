const express = require('express');
const router = express.Router();
const { getAuthors, getAuthorById, getAuthorByEmail, getMyProfile, createAuthor, updateAuthorById, deleteAuthor, updateAvatarByAuthorId } = require('../controllers/authorsController');
const { uploadAvatar } = require('../middlewares/multer');
const verifyToken = require('../middlewares/authenticationHandler')

// Definizione delle route
router
    .get('/authors', getAuthors) // Route GET per ottenere la lista degli autori
    .get('/authors/:id', getAuthorById) // Route GET per ottenere un singolo autore per ID
    .post('/login', getAuthorByEmail) // Route GET per ottenere un singolo autore per email e controllare password
    .get('/me', verifyToken, getMyProfile) // Route GET per ottenere il mio profilo
    .post('/authors', uploadAvatar, createAuthor) // Route POST per creare un nuovo autore
    .put('/authors/:id', updateAuthorById) // Route PUT per aggiornare un singolo autore per ID
    .delete('/authors/:id', deleteAuthor) // Route DELETE per eliminare un singolo autore per ID
    .patch('/authors/:id/avatar', uploadAvatar, updateAvatarByAuthorId) //Route PATCH per aggiornare il campo "avatar" di un autore

module.exports = router;