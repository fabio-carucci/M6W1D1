import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContextProvider';

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState('');

  // Funzione per gestire la sottomissione del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Creo un oggetto FormData dal form

    try {
      // Eseguo il login utilizzando i dati del formData
      await login({
        email: formData.get('email'),
        password: formData.get('password'),
      });
    } catch (error) {
      setError('Errore durante il login: ' + error.message);
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
        <Button variant="primary" className="mt-2" type="submit">
          Login
        </Button>

        {/* Mostra un messaggio di errore se presente */}
        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </div>
  );
}
