import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContextProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./styles.css";

export default function SigninForm() {

  const {login} = useAuth();

  const [startDate, setStartDate] = useState(new Date()); // Stato per memorizzare la data di nascita selezionata

  // Funzione per gestire la sottomissione del form
  const handleSubmit = (e) => {
    e.preventDefault();

    login();
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
            showYearDropdown // Mostra un dropdown per selezionare l'anno
            scrollableYearDropdown // Abilita la scrollbar nel dropdown per gli anni
            yearDropdownItemNumber={15} // Numero di anni mostrati nel dropdown
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
        <Button variant="primary" className="mt-2" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
}
