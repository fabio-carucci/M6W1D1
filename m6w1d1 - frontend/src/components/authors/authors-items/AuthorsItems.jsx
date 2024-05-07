import React from 'react';
import { Card } from 'react-bootstrap';
import placeholderImage from '../../../assets/placeholder.jpg';
import "./styles.css"

export default function AuthorsItem({ nome, cognome, avatar }) {
  return (
    <Card className='authors-items'>
      <Card.Img 
        variant="top" 
        src={avatar || placeholderImage} // Usa l'avatar se presente, altrimenti usa l'immagine placeholder
        alt={`${nome} ${cognome}`} 
      />
      <Card.Body>
        <Card.Title className='text-success'>{`${nome} ${cognome}`}</Card.Title>
      </Card.Body>
    </Card>
  );
}
