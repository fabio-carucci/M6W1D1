const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const author = require('../models/author');
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

// Opzioni per configurare Oauth di Google
const options = {
    clientID: process.env.G_CLIENT_ID, 
    clientSecret: process.env.G_SECRET, 
    callbackURL: process.env.G_CB // callback da eseguire quando un utente effettua l'autenticazione con google
}

// Creo un'istanza di GoogleStrategy
const googleStrategy = new GoogleStrategy(options, async (accessToken, refreshToken, profile, passportNext) => {

    try {
        // Destrutturo oggetto profile
        const { email, given_name, family_name, picture, sub } = profile._json;
    
        // Verifico se l'author esiste già nel DB
        const foundAuthor = await author.findOne( { email } );

        if (foundAuthor) {
            // Creo token di accesso 
            const token = generateToken(foundAuthor);

            // Chiamo callback passando null come errore e il token di accesso come secondo parametro
            passportNext(null, { token });
        } else {
            // Creo un nuovo utente con google
            const newAuthor = new author({
                email: email,
                nome: given_name, 
                cognome: family_name, 
                avatar: picture,
                googleId: sub,
            });

            await newAuthor.save(); 

            // Creo token con la funzione jwt
            const token = generateToken(newAuthor);

            passportNext(null, { token });
        }        
    } catch (error) {
        passportNext(error);
    }
}); 

module.exports = googleStrategy;