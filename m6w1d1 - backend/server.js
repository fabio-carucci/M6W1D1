const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { badRequestHandler, genericErrorHandle } = require('./middlewares/errorHandler');
const verifyToken = require('./middlewares/authenticationHandler');
const passport = require('passport');
const googleStrategy = require('./middlewares/passport');


const loginRoutes = require('./routes/loginRoutes') // Importa le routes di login e signup
const authorsRoutes = require('./routes/authorsRoutes'); // Importa le routes degli autori
const blogPostsRoutes = require('./routes/blogPostsRoutes'); // Importa le routes dei post del Blog
const commentsRoutes = require('./routes/commentsRoutes') // Importa le routes dei commenti dei post

const PORT = process.env.PORT || 5002;
const db = process.env.DB_URL;

const app = express(); // Crea un'istanza di Express

// Middleware per consentire le richieste CORS dal frontend
app.use(cors());

// Middleware per analizzare i body delle richieste in formato JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send("server listening")
});

// Middleware per strategy di google
passport.use('google', googleStrategy);

// Route di login 
app.use('/', loginRoutes);

// Utilizza le routes
app.use('/', verifyToken, authorsRoutes);
app.use('/', verifyToken, blogPostsRoutes);
app.use('/', verifyToken, commentsRoutes);

// Regola di fallback per il routing client-side
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Route generica per gestire il 404
app.use('*', (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(err);
});

// Utilizza i middlewares per gestire gli errori
app.use(badRequestHandler); // status code: 400
app.use(genericErrorHandle); // status code: 500 

// Connessione al database MongoDB utilizzando Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connessione al database MongoDB riuscita');
        // Avvia il server solo dopo che la connessione al database è stata stabilita con successo
        app.listen(PORT, () => {
            console.log(`Il server è in ascolto sulla porta ${PORT}`);
        });
    } catch (error) {
        console.error('Errore durante la connessione al database MongoDB:', error);
    }
};

// Invocazione della funzione di connessione al database
connectDB();