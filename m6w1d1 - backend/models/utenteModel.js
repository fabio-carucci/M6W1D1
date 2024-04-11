const mongoose = require('mongoose');

// Definizione dello schema per il modello Utente
const utenteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cognome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dataDiNascita: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

// Creazione del modello Utente utilizzando lo schema definito sopra
module.exports = mongoose.model('Utente', utenteSchema);
