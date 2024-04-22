import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContextProvider';

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  // Funzione per gestire la sottomissione del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Creo un oggetto FormData dal form
    const email = formData.get('email'); // Ottengo l'email dal formData
    const password = formData.get('password'); // Ottengo la password dal formData

    try {
      setLoading(true); // Imposta lo stato di caricamento su true durante la richiesta

      // Invio la richiesta POST al server
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Inserisco email e password nel body della richiesta
      });

      // Verifico se la risposta è stata ricevuta correttamente
      if (!response.ok) {
        throw new Error('Errore durante la richiesta al server');
      }
      
      // Recupera i dati dell'utente loggato dal corpo della risposta
      const userData = await response.json()
      // Eseguo il login utilizzando i dati del formData
      await login(userData);

    } catch (error) {
      setError('Errore durante il login: ' + error.message);
    } finally {
      setLoading(false); // Imposta lo stato di caricamento su false dopo la richiesta
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* Campi del form per l'email e la password */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email" // Nome al campo per poterlo recuperare dal formData
            placeholder="Inserisci email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        {/* Bottone per effettuare il login */}
        <Button variant="primary" className="mt-2" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>

        {/* Mostra un messaggio di errore se presente */}
        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </div>
  );
}
