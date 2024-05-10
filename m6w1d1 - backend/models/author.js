const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authorSchema = new mongoose.Schema({
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
        type: Date,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }, 
    googleId: {
        type: String,
        required: false
    }
});

// Middleware di pre-save per hashare la password prima di salvarla nel database
authorSchema.pre('save', async function (next) {
    const author = this;
    // Se la password non è stata modificata, continua
    if (!author.isModified('password')) {
        return next();
    }
    try {
        // Genera il salt e hash della password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(author.password, salt);
        author.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Metodo per confrontare la password fornita con quella nel database
authorSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('author', authorSchema);