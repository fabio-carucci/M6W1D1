const author = require('../models/author');

// Metodo per ottenere la lista degli autori
exports.getAuthors = async (req, res) => {
    try {
        // Ottieni la lista degli autori dal database
        const authors = await author.find();

        // Invia la lista degli autori come risposta
        res.json(authors);
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante il recupero degli autori.' });
    }
};

// Metodo per ottenere un singolo autore
exports.getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id; // Ottieni l'ID dell'autore dalla richiesta
        // Trova l'autore con l'ID specificato nel database
        const author = await author.findById(authorId);
        // Se l'autore è stato trovato, invia l'autore come risposta
        if (author) {
            res.json(author);
        } else {
            // Se l'autore non è stato trovato, invia un messaggio di errore
            res.status(404).json({ message: 'Autore non trovato.' });
        }
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante il recupero dell\'autore.' });
    }
};

// Metodo per creare un nuovo autore
exports.createAuthor = async (req, res) => {
    try {
        const { nome, cognome, email, dataDiNascita, avatar } = req.body; // Ottieni i dati dell'autore dalla richiesta
        // Crea un nuovo autore nel database utilizzando i dati forniti
        const newAuthor = await author.create({ nome, cognome, email, dataDiNascita, avatar });
        // Invia il nuovo autore creato come risposta
        res.status(201).json(newAuthor);
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante la creazione dell\'autore.' });
    }
};