const express = require('express');
const router = express.Router();
const { getAuthors } = require('../controllers/authorsController');

// Definizione della route GET per ottenere la lista degli autori
router.get('/authors', getAuthors);

module.exports = router;