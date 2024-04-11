const express = require('express'); // Importa il framework Express per gestire le richieste HTTP
const mongoose = require('mongoose'); // Importa il modulo mongoose per interagire con il database MongoDB
const cors = require('cors'); // Importa il modulo cors per interagire con il frontend

require('dotenv').config();

const authorsRoutes = require('./routes/authorsRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Utilizza la route degli autori nel server
app.use('/api', authorsRoutes);

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});