const express = require('express');
const router = express.Router();
const passport = require('passport')
const { getAuthorByEmail, createAuthor } = require('../controllers/authorsController');
const { uploadAvatar } = require('../middlewares/multer');

// Definizione delle route
router
    .post('/login', getAuthorByEmail) // Route GET per ottenere un singolo autore per email e controllare password
    .post('/authors', uploadAvatar, createAuthor) // Route POST per creare un nuovo autore
    .get('/googleLogin', passport.authenticate("google", {scope: ["profile", "email"]})) // Route GET per il login con Google
    .get('/callback', passport.authenticate("google", {session: false}), (req, res, next) => {
        try {
            res.redirect(`https://epiblog-fabiocarucci.vercel.app/?accessToken=${req.user.token}`)
        } catch (error) {
            next(error);
        }
    })

module.exports = router;