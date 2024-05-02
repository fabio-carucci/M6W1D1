require('dotenv').config();
const jwt = require('jsonwebtoken');

// Funzione middleware per gestire l'autenticazione
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Ottieni il token dall'intestazione Authorization
    if (!token) {
        return res.status(401).json({ message: 'Token non fornito.' });
    }

    const myToken = token.split(' ')[1]; // Ottengo il token senza la prima parte, esempio "Bearer "

    const secret = process.env.SECRET_PASSWORD;

    jwt.verify(myToken, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token non valido.' });
        }
        req.authorId = decoded.id; // Aggiungi l'ID dell'autore decodificato all'oggetto di richiesta per utilizzarlo nelle richieste successive
        next();
    });
};

module.exports = verifyToken;