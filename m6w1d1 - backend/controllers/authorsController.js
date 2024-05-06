const author = require('../models/author');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_PASSWORD;

// Metodo per generare un token JWT
function generateToken(author) {
    const payload = {
        id: author._id,
        email: author.email
    };
    return jwt.sign(payload, secret, { expiresIn: '1h' }); // Il token scade dopo 1 ora
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
        // Se l'utente è autenticato con successo, genera un token JWT
        const token = generateToken(foundAuthor);

        // Creazione di un nuovo oggetto senza password e data di nascita
        const authorData = {
            _id: foundAuthor._id,
            nome: foundAuthor.nome,
            cognome: foundAuthor.cognome,
            email: foundAuthor.email, 
            avatar: foundAuthor.avatar
        };

        // Invia il token JWT al client
        res.json({ token, author: authorData});
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante il recupero dell\'autore.' });
    }
};

// Metodo per aggiornare il token prima della scadenza
exports.refreshToken = async (req, res) => {
    try {
        const { user } = req.body; // Ottieni l'utente dalla richiesta
        if (!user) {
            return res.status(401).json({ message: "Utente non autorizzato" });
        }

        // Genera un nuovo token con lo stesso payload dell'utente attuale
        const newToken = generateToken(user);

        // Invia il nuovo token nella risposta
        res.status(200).json({ token: newToken });
    } catch (error) {
        console.error("Errore durante l'aggiornamento del token:", error);
        res.status(500).json({ message: "Errore durante l'aggiornamento del token" });
    }
};

// Metodo per ottenere il profilo dell'autore autenticato tramite token
exports.getMyProfile = async (req, res) => {
    try {
        // Assume che il metodo per ottenere il profilo dell'autore prende l'ID dell'autore come parametro
        const authorId = req.authorId;
        
        // Uso l'ID per fare una query al database e ottenere il profilo dell'autore
        const authorProfile = await author.findById(authorId);

        // Verifica se l'autore esiste
        if (!authorProfile) {
            return res.status(404).json({ message: "Profilo autore non trovato" });
        }

        // Se l'autore esiste, restituisci il profilo
        res.status(200).json(authorProfile);
    } catch (error) {
        console.error("Errore durante il recupero del profilo dell'autore:", error);
        res.status(500).json({ message: "Si è verificato un errore durante il recupero del profilo dell'autore" });
    }
};

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

        // Se l'utente è registrato con successo, genera un token JWT
        const token = generateToken(newAuthor);

        // Creazione di un nuovo oggetto senza password e data di nascita
        const newAuthorData = {
            _id: newAuthor._id,
            nome: newAuthor.nome,
            cognome: newAuthor.cognome,
            email: newAuthor.email, 
            avatar: newAuthor.avatar
        };

        // Invia il token JWT al client
        res.json({ token, author: newAuthorData})

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