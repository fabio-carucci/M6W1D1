const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configurato cloudinary con le credenziali
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Creazione di un'istanza di CloudinaryStorage per gli avatar
const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'avatars', // Cartella dove vengono salvati gli avatar
      allowed_formats: ['jpg', 'jpeg', 'png'], // Formati consentiti
      format: async (req, file) => 'jpg' // Funzione per modificare il formato, se necessario
    }
});

// Creazione di un'istanza di CloudinaryStorage per le copertine
const coverStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'covers', // Cartella dove vengono salvate le copertine
      allowed_formats: ['jpg', 'jpeg', 'png'], // Formati consentiti
      format: async (req, file) => 'jpg' // Funzione per modificare il formato, se necessario
    }
});

// Middleware per caricare un singolo file di avatar
exports.uploadAvatar = multer({ storage: avatarStorage }).single('avatar');

// Middleware per caricare un singolo file di copertina
exports.uploadCover = multer({ storage: coverStorage }).single('cover');