import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContextProvider';
import GoogleLoginButton from './GoogleLoginButton';
import "./styles.css";

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Stato per il caricamento  
  const [showLoginForm, setShowLoginForm] = useState(false); // Stato per mostrare/nascondere il form di login


  const handleEmailLoginClick = () => {
    setShowLoginForm(true); // Mostra il form di login quando l'utente clicca su Accedi con l'email
  };

  // Funzione per gestire la sottomissione del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Creo un oggetto FormData dal form
    const email = formData.get('email'); // Ottengo l'email dal formData
    const password = formData.get('password'); // Ottengo la password dal formData

    try {
      setLoading(true); // Imposta lo stato di caricamento su true durante la richiesta

      // Invio la richiesta POST al server
      const response = await fetch('https://m6w1d1-inzr.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Inserisco email e password nel body della richiesta
      });

      // Verifico se la risposta è stata ricevuta correttamente
      if (!response.ok) {
        // Recupera il messaggio di errore dal corpo della risposta
        const { message } = await response.json();
        throw new Error(message);
      }
      
      // Recupera i dati dell'utente loggato dal corpo della risposta
      const {token, author} = await response.json()
      // Eseguo il login utilizzando i dati del formData
      await login(token, author);

    } catch (error) {
      setError('Errore durante il login: ' + error.message);
    } finally {
      setLoading(false); // Imposta lo stato di caricamento su false dopo la richiesta
    }
  };

  return (
    <div>
      {!showLoginForm && ( // Non mostrare i buttons se è visibile il form
        <div className="m-0 d-flex flex-column">
          <div>
            <Button variant="outline-secondary" className="mt-2" onClick={handleEmailLoginClick}>
              Accedi con l'email
            </Button>
          </div>
          <div className='mt-2'>
            <GoogleLoginButton />
          </div>
        </div>
      )}

      {showLoginForm && ( // Mostra il form di login solo se showLoginForm è true
        <div>

          <Form onSubmit={handleSubmit}>
            {/* Campi del form per l'email e la password */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
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
            <div className="text-center">
              <Button variant="outline-primary" className="mt-2 ps-4 pe-4" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </div>

            {/* Mostra un messaggio di errore se presente */}
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>

          <div className="hr-container">
            <span>oppure</span>
            <hr />
          </div>

          <div className='text-center'>
            <GoogleLoginButton />
          </div>

        </div>
      )}
    </div>
  );
}
