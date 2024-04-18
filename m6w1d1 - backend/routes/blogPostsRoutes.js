const express = require('express');
const router = express.Router();
const { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPostById, deleteBlogPost } = require('../controllers/blogPostsController');
const authenticationMiddleware = require('../middlewares/authenticationHandler');

// Definizione delle routes
router
    .get('/blogPosts', getBlogPosts) // Route GET per ottenere la lista dei post nel blog
    .get('/blogPosts/:id', getBlogPostById) // Route GET per ottenere un singolo post per ID
    .post('/blogPosts', createBlogPost) // Route POST per creare un nuovo post
    .put('/blogPosts/:id', authenticationMiddleware, updateBlogPostById) // Route PUT per aggiornare un singolo post per ID
    .delete('/blogPosts/:id', authenticationMiddleware, deleteBlogPost); // Route DELETE per eliminare un singolo post per ID

module.exports = router;