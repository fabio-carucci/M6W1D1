const blogPost = require('../models/blogPost');
const author = require('../models/author');
const sendEmail = require('../sendEmail');

// Metodo per ottenere i commenti di un post specifico tramite :id
exports.getCommentsByBlogPostId = async (req, res) => {
    try {
        // Estrai l'ID del post dalla richiesta
        const { id } = req.params;
        
        // Cerca il post nel database utilizzando l'ID e popola solo i campi 'nome', 'cognome' e 'avatar' di 'createdBy'
        const post = await blogPost.findById(id).populate({
            path: 'comments.createdBy',
            select: 'nome cognome avatar'
        });

        // Verifica se il post è stato trovato
        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }

        // Estrai i commenti dal post
        const comments = post.comments;

        // Restituisci i commenti
        res.status(200).json({ comments });
    } catch (error) {
        console.error("Errore durante il recupero dei commenti:", error);
        res.status(500).json({ message: "Errore durante il recupero dei commenti" });
    }
};

// Metodo per ottenere un commento specifico da un post specifico tramite :id e :commentId
exports.getCommentByBlogPostAndCommentId = async (req, res) => {
    try {
        // Estrai gli ID del post e del commento dalla richiesta
        const { id, commentId } = req.params;
        
        // Cerca il post nel database utilizzando l'ID e popola solo i campi 'nome', 'cognome' e 'avatar' di 'createdBy'
        const post = await blogPost.findById(id).populate({
            path: 'comments.createdBy',
            select: 'nome cognome avatar'
        });

        // Verifica se il post è stato trovato
        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }

        // Trova il commento all'interno dell'array dei commenti del post utilizzando l'ID del commento
        const comment = post.comments.find(comment => String(comment._id) === commentId);

        // Verifica se il commento è stato trovato
        if (!comment) {
            return res.status(404).json({ message: "Commento non trovato" });
        }

        // Restituisci il commento
        res.status(200).json({ comment });
    } catch (error) {
        console.error("Errore durante il recupero del commento:", error);
        res.status(500).json({ message: "Errore durante il recupero del commento" });
    }
};

// Metodo per aggiungere un nuovo commento a un post specifico tramite :postId
exports.addCommentToBlogPost = async (req, res) => {
    try {
        // Estrai l'ID del post dalla richiesta
        const { id } = req.params;

        // Estrai l'ID dell'autore dal corpo della richiesta
        const { content, authorId } = req.body;

        // Cerca il post nel database utilizzando l'ID
        const post = await blogPost.findById(id);

        // Verifica se il post è stato trovato
        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }

        // Crea un nuovo commento utilizzando i dati forniti
        const newComment = {
            content,
            createdBy: authorId // Associa l'ID dell'autore al campo createdBy
        };

        // Aggiungi il nuovo commento all'array dei commenti del post
        post.comments.push(newComment);

        // Salva il post aggiornato nel database
        await post.save();

        // Restituisci il post aggiornato con il nuovo commento
        res.status(201).json({ post });
    } catch (error) {
        console.error("Errore durante l'aggiunta del commento:", error);
        res.status(500).json({ message: "Errore durante l'aggiunta del commento" });
    }
};