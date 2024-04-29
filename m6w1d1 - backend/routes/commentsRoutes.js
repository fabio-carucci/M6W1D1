const express = require('express');
const router = express.Router();
const { getCommentsByBlogPostId, getCommentByBlogPostAndCommentId, addCommentToBlogPost, updateCommentByCommentId, deleteCommentByCommentId } = require('../controllers/commentsController');

// Definizione delle routes
router
    .get('/blogPosts/:id/comments', getCommentsByBlogPostId) // Route GET per ottenere la lista dei commenti del post
    .get('/blogPosts/:id/comments/:commentId', getCommentByBlogPostAndCommentId) // Route GET per ottenere un singolo commento per ID di un post
    .post('/blogPosts/:id', addCommentToBlogPost) // Route POST per creare un nuovo commento su un post
    .put('/blogPosts/:id/comment/:commentId', updateCommentByCommentId) // Route PUT per modificare un commento di un post
    .delete('/blogPosts/:id/comment/:commentId', deleteCommentByCommentId); // Route DELETE per cancellare un commento di un post

module.exports = router;