import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configurato cloudinary con le credenziali
cloudinary.config({
    cloud_name: 'il-tuo-nome-cloudinary',
    api_key: 'la-tua-api-key',
    api_secret: 'il-tuo-api-secret'
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
const uploadAvatar = multer({ storage: avatarStorage }).single('avatar');

// Middleware per caricare un singolo file di copertina
const uploadCover = multer({ storage: coverStorage }).single('cover');

// Esporta i middleware
export { uploadAvatar, uploadCover };