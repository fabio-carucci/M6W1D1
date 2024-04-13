const blogPost = require('../models/blogPost');

// Metodo per ottenere la lista di blogPosts
exports.getBlogPosts = async (req, res) => {
    try {
        // Ottieni la lista dei blogPosts dal database
        const blogPosts = await blogPost.find();

        // Invia la lista dei blogPosts come risposta
        res.json(blogPosts);
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante il recupero dei Posts del Blog.' });
    }
};

// Metodo per ottenere un singolo blogPost 
exports.getBlogPostById = async (req, res) => {
    try {
        const blogPostId = req.params.id; // Ottieni l'ID del post dalla richiesta
        // Trova il post con l'ID specificato nel database
        const findedBlogPost = await blogPost.findById(blogPostId);
        // Se il blog è stato trovato, invia il blog come risposta
        if (findedBlogPost) {
            res.json(findedBlogPost);
        } else {
            // Se il blog non è stato trovato, invia un messaggio di errore
            res.status(404).json({ message: 'Autore non trovato.' });
        }
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante il recupero del post nel Blog' });
    }
};

// Metodo per creare un nuovo blogPost
exports.createBlogPost = async (req, res) => {
    try {
        const { category, title, cover, readTime: { value, unit }, author: { name, avatar }, content } = req.body; // Ottieni i dati del post dalla richiesta
        // Crea un nuovo blogPost nel database utilizzando i dati forniti
        const newBlogPost = await blogPost.create({ category, title, cover, readTime: { value, unit }, author: { name, avatar }, content });
        // Invia il nuovo blogPost creato come risposta
        res.status(201).json(newBlogPost);
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante la creazione del post del blog' });
    }
};

// Metodo per aggiornare un blogPost
exports.updateBlogPostById = async (req, res) => {
    try {
        const blogPostId = req.params.id; // Ottieni l'ID del post dalla richiesta
        // Trova il post del blog con l'ID specificato nel database e aggiorna i dati con quelli ricevuti nel corpo della richiesta
        const updatedBlogPost = await blogPost.findByIdAndUpdate(blogPostId, req.body, { new: true });
        // Se il post è stato trovato e aggiornato correttamente, invia il post aggiornato come risposta
        if (updatedBlogPost) {
            res.json(updatedBlogPost);
        } else {
            // Se il post non è stato trovato, invia un messaggio di errore
            res.status(404).json({ message: 'Post non trovato.' });
        } 
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante l\'aggiornamento del post del Blog.' });
    }
};

//Metodo per eliminare un blogPost
exports.deleteBlogPost = async (req, res) => {
    try {
        const blogPostId = req.params.id; // Ottieni l'ID del post dalla richiesta
        // Trova il post nel Blog con l'ID specificato nel database e elimina
        const deletedBlogPost = await blogPost.findByIdAndDelete(blogPostId);
        // Se il post è stato trovato e eliminato correttamente, invia il post eliminato come risposta
        if (deletedBlogPost) {
            res.json(deletedBlogPost);
        } else {
            // Se il post non è stato trovato, invia un messaggio di errore
            res.status(404).json({ message: 'Post non trovato.' });
        } 
    } catch (err) {
        // Se si verifica un errore, invia un messaggio di errore come risposta
        console.error(err);
        res.status(500).json({ message: 'Si è verificato un errore durante l\'eliminazione del post nel Blog.' });
    }
};