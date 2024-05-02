const express = require('express');
const router = express.Router();
const { getAuthorByEmail, createAuthor } = require('../controllers/authorsController');
const { uploadAvatar } = require('../middlewares/multer');

// Definizione delle route
router
    .post('/login', getAuthorByEmail) // Route GET per ottenere un singolo autore per email e controllare password
    .post('/authors', uploadAvatar, createAuthor) // Route POST per creare un nuovo autore

module.exports = router;