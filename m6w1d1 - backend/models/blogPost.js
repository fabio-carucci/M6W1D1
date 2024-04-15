const mongoose = require('mongoose');

// Definizione dello schema per il modello blog
const blogPostSchema = new mongoose.Schema({
    category: { // Categoria del Post
        type: String,
        required: true
    },
    title: { // Titolo del Post
        type: String,
        required: true
    },
    cover: { // Link dell'immagine
        type: String,
        required: true,
    },
    readTime: {
        value: { // Numero
            type: Number, 
            required: true
        },
        unit: { // Unità di misura
            type: String,
            required: true
        }
    },
    author: {
        name: { // Nome
            type: String, 
            required: true
        },
        avatar: { // Immagine dell'autore
            type: String, 
            required: true
        }
    },
    content: { // HTML dell'articolo
        type: String,
        required: true
    }
});

// Creazione del modello blog utilizzando lo schema definito sopra
module.exports = mongoose.model('blogPost', blogPostSchema);