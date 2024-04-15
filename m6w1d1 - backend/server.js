const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authorsRoutes = require('./routes/authorsRoutes'); // Importa le routes degli autori
const blogPostsRoutes = require('./routes/blogPostsRoutes'); // Importa le routes degi post del Blog

const PORT = process.env.PORT || 5002;
const db = process.env.DB_URL;

const app = express(); // Crea un'istanza di Express

// Middleware per consentire le richieste CORS dal frontend
app.use(cors());

// Middleware per analizzare i body delle richieste in formato JSON
app.use(express.json());

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

// Utilizza le routes
app.use('/', authorsRoutes);
app.use('/', blogPostsRoutes);