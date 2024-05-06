import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function TokenExpirationAlert({ logout, user, token, setToken, setSessionExpired }) {
  const [countdown, setCountdown] = useState(30); // Tempo in secondi per il countdown

  // Funzione per chiudere il modal
  const handleClose = () => setSessionExpired(false);

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5001/sessionExpired', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Aggiungi il token JWT dell'utente nell'header
        },
        body: JSON.stringify({ user }),
      });
  
      if (!response.ok) {
        throw new Error('Errore durante l\'aggiornamento del token');
      }
  
      const data = await response.json();
      const { token: newToken } = data;
  
      setToken(newToken);
      localStorage.setItem('token', newToken);

    } catch (error) {
      console.error('Errore durante l\'aggiornamento del token:', error.message);
      // Gestisci gli errori se necessario
    }
  };
  

  // Funzione per gestire il countdown
  useEffect(() => {
    let timer;

      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Effetto per aprire il modal quando il countdown raggiunge 0
  useEffect(() => {
    if (countdown === 0) {
      localStorage.setItem("isSessionExpired", true); // Salva sessionExpired nel localStorage 
       
      handleClose(); // Chiudi il modal
      logout(); // Effettua il logout
    }
  }, [countdown, logout]);

  // Funzione per gestire il click su "Rimani loggato"
  const handleStayLoggedIn = async () => {

    try {
        await refreshToken(); // Crea un nuovo token e salvalo
        setSessionExpired(false);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento del token:', error.message);
    }

  };

  return (
    <Modal show={true} onHide={handleClose} backdrop="static">
      <Modal.Header >
        <Modal.Title>Sessione inattiva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        La tua sessione sta per scadere. Rimani loggato?
        <br />
        Timer: {countdown} secondi
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleStayLoggedIn}>
          Rimani loggato
        </Button>
        <Button variant="primary" onClick={logout}>
          Effettua il logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
