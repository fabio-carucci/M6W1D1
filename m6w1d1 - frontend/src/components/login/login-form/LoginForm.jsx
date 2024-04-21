import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContextProvider';

export default function LoginForm() {

  const {login} = useAuth();

  // Funzione per gestire la sottomissione del form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    login();
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            {/* Campi del form per l'email e la password */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            {/* Bottone per effettuare il login */}
            <Button variant="primary" className="mt-2" type="submit">
                Login
            </Button>
        </Form>
    </div>
  )
}
