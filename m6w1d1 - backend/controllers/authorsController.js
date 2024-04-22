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

// Metodo per ottenere un singolo autore dall'Id
exports.getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id; // Ottieni l'ID dell'autore dalla richiesta
        // Trova l'autore con l'ID specificato nel database
        const findedAuthor = await author.findById(authorId);
        // Se l'autore è stato trovato, invia l'autore come risposta
        if (findedAuthor) {
            res.json(findedAuthor);
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

// Metodo per ottenere un singolo autore dall'email e verificare la password
exports.getAuthorByEmail = async (req, res) => {
    try {
        const { email, password } = req.body; // Ottieni email e password dall'oggetto di richiesta
        // Cerca l'autore con l'email specificata nel database
        const foundAuthor = await author.findOne({ email });
        // Se l'autore non è stato trovato, invia un messaggio di errore
        if (!foundAuthor) {
            return res.status(404).json({ message: 'Autore non trovato.' });
        }
        // Verifica se la password è valida
        const isPasswordValid = await foundAuthor.comparePassword(password);
        if (!isPasswordValid) {
            // Se la password non è valida, invia un messaggio di errore
            return res.status(401).json({ message: 'Password non valida.' });
        }
        // Se si arriva a questo punto, la password è valida, invia l'autore come risposta
        res.json(foundAuthor);
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante il recupero dell\'autore.' });
    }
};


// Metodo per creare un nuovo autore
exports.createAuthor = async (req, res) => {
    try {
        let avatarUrl = null;

        // Verifica se è stato caricato un file
        if (req.file && req.file.path) {
            // L'immagine è già stata caricata su Cloudinary nel middleware precedente
            avatarUrl = req.file.path;
        }

        // Crea un nuovo autore nel database utilizzando i dati forniti e il link di Cloudinary come avatar
        const newAuthor = await author.create({
            ...req.body,
            avatar: avatarUrl // Imposta l'avatar solo se è stato caricato un file
        });
        // Invia il nuovo autore creato come risposta
        res.status(201).json(newAuthor);
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante la creazione dell\'autore.' });
    }
};

// Metodo per aggiornare un autore
exports.updateAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id; // Ottieni l'ID dell'autore dalla richiesta
        // Trova l'autore con l'ID specificato nel database e aggiorna i dati con quelli ricevuti nel corpo della richiesta
        const updatedAuthor = await author.findByIdAndUpdate(authorId, req.body, { new: true });
        // Se l'autore è stato trovato e aggiornato correttamente, invia l'autore aggiornato come risposta
        if (updatedAuthor) {
            res.json(updatedAuthor);
        } else {
            // Se l'autore non è stato trovato, invia un messaggio di errore
            res.status(404).json({ message: 'Autore non trovato.' });
        } 
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante l\'aggiornamento dell\'autore.' });
    }
};

//Metodo per eliminare un autore
exports.deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id; // Ottieni l'ID dell'autore dalla richiesta
        // Trova l'autore con l'ID specificato nel database e elimina
        const deletedAuthor = await author.findByIdAndDelete(authorId);
        // Se l'autore è stato trovato e eliminato correttamente, invia l'autore eliminato come risposta
        if (deletedAuthor) {
            res.json(deletedAuthor);
        } else {
            // Se l'autore non è stato trovato, invia un messaggio di errore
            res.status(404).json({ message: 'Autore non trovato.' });
        } 
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante l\'eliminazione dell\'autore.' });
    }
};

// Metodo per aggiungere/modificare l'url dell'immagine dell'autore
exports.updateAvatarByAuthorId = async (req, res) => {
    try {
        // Cercare e aggiornare utente con Id specifico alla proprietà avatar
        const updatedAuthor = await author.findByIdAndUpdate(
            req.params.id, 
            { avatar: req.file.path },
            { new: true }
        );
        // Se l'autore è stato trovato e aggiornato correttamente, invia l'autore aggiornato come risposta
        if(updatedAuthor) {
            res.json(updatedAuthor);
        } else {
            // Se l'autore non è stato trovato, invia un messaggio di errore
            res.status(404).json({ message: 'Autore non trovato.' });
        };
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante l\'aggiornamento dell\'autore.' });
    };  
};