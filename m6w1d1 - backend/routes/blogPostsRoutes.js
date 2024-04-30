const express = require('express');
const router = express.Router();
const { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPostById, deleteBlogPost, updateCoverByBlogPostId } = require('../controllers/blogPostsController');
const { uploadCover } = require('../middlewares/multer');

// Definizione delle routes
router
    .get('/blogPosts', getBlogPosts) // Route GET per ottenere la lista dei post nel blog
    .get('/blogPosts/:id', getBlogPostById) // Route GET per ottenere un singolo post per ID
    .post('/blogPosts', createBlogPost) // Route POST per creare un nuovo post
    .put('/blogPosts/:id', updateBlogPostById) // Route PUT per aggiornare un singolo post per ID
    .delete('/blogPosts/:id', deleteBlogPost) // Route DELETE per eliminare un singolo post per ID
    .patch('/blogPosts/:id/avatar', uploadCover, updateCoverByBlogPostId) //Route PATCH per aggiornare il campo "cover" di un post

module.exports = router;