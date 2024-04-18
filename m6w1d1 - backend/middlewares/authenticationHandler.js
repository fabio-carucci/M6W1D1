require('dotenv').config();

// Funzione middleware per gestire l'autenticazione
const authenticationMiddleware = (req, res, next) => {
    // Controlla se l'header Authorization è presente
    const authHeader = req.headers['authorization'];

    // Se l'header Authorization non è presente, restituisci 401 Unauthorized
    if (!authHeader) {
        return res.status(401).json({ error: 'Manca l\'header Authorization' });
    }

    // Controlla se l'header Authorization inizia con "Bearer "
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Formato non valido per l\'header Authorization' });
    }

    const secretPassword = process.env.SECRET_PASSWORD; // Leggi la password dal file .env

    if (!secretPassword) {
        return res.status(500).json({ error: 'Password non trovata' });
    }

    if (token === secretPassword) {
        // Se il token corrisponde alla password, procedi al middleware successivo
        return next();
    }
    
    // Se il token non corrisponde alla password, restituisci 401 Unauthorized
    return res.status(401).json({ error: 'Token non valido' });
};

module.exports = authenticationMiddleware;