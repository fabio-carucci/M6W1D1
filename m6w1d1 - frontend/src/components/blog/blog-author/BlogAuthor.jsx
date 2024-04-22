import React, { useState, useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { PersonCircle } from 'react-bootstrap-icons';
import "./styles.css";

export default function BlogAuthor ({authorId}) {
  const [author, setAuthor] = useState(null);

  const fetchAuthor = async () => {
    try {
      let url = "http://localhost:5001/authors"
      // Effettua una richiesta GET per ottenere i dati dell'autore utilizzando l'ID
      const response = await fetch(`${url}/${authorId}`); // Sostituisci con la tua route API per ottenere l'autore
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei dati dell'autore");
      }
      const authorData = await response.json();
      setAuthor(authorData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [authorId]);

  if (!author) {
    return null; // Se l'autore non è ancora stato caricato, non renderizzare nulla o un messaggio di caricamento
  }

  const { nome, avatar } = author;

  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        {/* Se l'avatar non è presente, inserisci l'icona di default */}
        {avatar ? <Image className="blog-author" src={avatar} roundedCircle /> : <PersonCircle style={{width: "40px",height: "40px"}}/>}
      </Col>
      <Col>
        <div>di</div>
        <h6>{nome}</h6>
      </Col>
    </Row>
  );
};