import React, { useState } from 'react';
import { Form, Button, Spinner, Modal } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContextProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./styles.css";

export default function SignUpForm() {

  const { login } = useAuth();

  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Stato per controllare la visualizzazione del modale

  const handleClose = () => setShowModal(false); // Funzione per chiudere il modale

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('nome', e.target.formBasicFirstName.value);
      formData.append('cognome', e.target.formBasicLastName.value);
      formData.append('email', e.target.formBasicEmail.value);
      formData.append('password', e.target.formBasicPassword.value);
      formData.append('dataDiNascita', startDate.toISOString());
      formData.append('avatar', e.target.formBasicAvatar.files[0]);

      const response = await fetch('https://m6w1d1-inzr.onrender.com/authors', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const { token, author } = await response.json();
        await login(token, author);
        setShowModal(false); // Chiudi il modale dopo la registrazione
      } else {
        console.error('Errore durante la registrazione');
      }

    } catch (error) {
      console.error('Errore durante la registrazione:', error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="link" className="p-0 mt-3" style={{color: "rgb(200, 0, 0)"}} onClick={() => setShowModal(true)}>
        Non hai un account? Registrati
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci il tuo nome" required />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci il tuo cognome" required />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Inserisci la tua password" required />
            </Form.Group>

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

            <Form.Group controlId="formBasicAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>

            <div className='text-center'>
              <Button variant="outline-primary" className="mt-4 ps-4 pe-4" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Signup'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Chiudi</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
