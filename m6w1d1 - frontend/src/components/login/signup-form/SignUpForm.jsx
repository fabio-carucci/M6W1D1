import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContextProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./styles.css";

export default function SignUpForm() {

  const { login } = useAuth();

  const [startDate, setStartDate] = useState(new Date()); // Stato per memorizzare la data di nascita selezionata
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  // Funzione per gestire la sottomissione del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(); // Creazione di un oggetto FormData
      formData.append('nome', e.target.formBasicFirstName.value); // Aggiungi il nome
      formData.append('cognome', e.target.formBasicLastName.value); // Aggiungi il cognome
      formData.append('email', e.target.formBasicEmail.value); // Aggiungi l'email
      formData.append('password', e.target.formBasicPassword.value); // Aggiungi la password
      formData.append('dataDiNascita', startDate.toISOString()); // Aggiungi la data di nascita come stringa ISO
      formData.append('avatar', e.target.formBasicAvatar.files[0]); // Aggiungi l'avatar come file

      // Effettua la richiesta POST
      const response = await fetch('http://localhost:5001/authors', {
        method: 'POST',
        body: formData // Utilizza l'oggetto FormData come corpo della richiesta
      });

      // Controlla se la richiesta è andata a buon fine
      if (response.ok) {

      // Recupera i dati dell'utente registrato dal corpo della risposta
      const {token, author} = await response.json()

      // Eseguo il login utilizzando i dati del formData
      await login(token, author);

      } else {
        // Se la richiesta ha fallito, gestisci l'errore
        console.error('Errore durante la registrazione');
      }

    } catch (error) {
      console.error('Errore durante la registrazione:', error.message);

    } finally {
      setLoading(false); // Imposta lo stato di caricamento su false dopo la richiesta
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Inserisci il tuo nome" required />
        </Form.Group>

        {/* Campo Cognome */}
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Cognome</Form.Label>
          <Form.Control type="text" placeholder="Inserisci il tuo cognome" required />
        </Form.Group>

        {/* Campo Email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Inserisci la tua email" required />
        </Form.Group>

        {/* Campo Password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Inserisci la tua password" required />
        </Form.Group>

        {/* Campo Data di Nascita */}
        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label>Data di Nascita</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy" // Formato della data
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()} // Imposta la data massima selezionabile come data odierna
            required
          />
        </Form.Group>

        {/* Input per caricare l'avatar */}
        <Form.Group controlId="formBasicAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" accept="image/*" />
        </Form.Group>

        {/* Bottone per effettuare la registrazione */}
        <Button variant="primary" className="mt-2" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Signup'}
        </Button>
      </Form>
    </div>
  );
}
