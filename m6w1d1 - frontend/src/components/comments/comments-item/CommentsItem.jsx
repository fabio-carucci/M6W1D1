import React from "react";
import { Card, Image, Button, Row, Col } from "react-bootstrap";
import { PersonCircle, Trash } from 'react-bootstrap-icons';
import { useAuth } from "../../../context/AuthContextProvider";
import { useParams } from "react-router-dom";

export default function CommentsItem ( { _id: commentId, content, createdBy, createdAt, reloadComments } ) {

    const { _id: commentAuthorId, nome, cognome, avatar } = createdBy;
    const { user, token } = useAuth();
    const { _id: userId } = user;

    const { id } = useParams();

    const isCurrentUserCommentAuthor = userId === commentAuthorId;

    const deleteComment = async () => {
        try {
            const response = await fetch(`https://m6w1d1-inzr.onrender.com/blogPosts/${id}/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Assicurati di includere il token JWT
                }
            });
    
            if (!response.ok) {
                throw new Error('Errore durante la cancellazione del commento');
            }

    
            console.log('Commento eliminato con successo');
        } catch (error) {
            console.error('Errore durante la cancellazione del commento:', error.message);
            // Gestisci l'errore se necessario
        }
    };
    

    const handleDeleteComment = async () => {
        // Chiedi conferma prima di procedere con l'eliminazione
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo commento?");

        if (confirmDelete) {
            try {
                await deleteComment(); // Attendere il completamento di deleteComment()
                reloadComments(); // Chiamare reloadComments() solo dopo il completamento di deleteComment()
            } catch (error) {
                console.error('Errore durante l\'eliminazione del commento:', error.message);
                // Gestisci l'errore se necessario
            }
        }
    };

    return (
        <Card>
            <Card.Header>
                <div className="d-flex align-items-center">
                    {/* Se l'avatar non è presente, inserisci l'icona di default */}
                    {avatar ? <Image width={20} src={avatar} roundedCircle alt={`Profile Pic of Comment written by ${nome} ${cognome}`} /> : <PersonCircle style={{width: "20px",height: "20px"}}/>}
                    <div className="ms-2">{`${nome} ${cognome}`}</div>
                </div>
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>{` ${content} `}</p>
                    <footer className="blockquote-footer fs-6">
                        <Row className="align-items-center pb-0" height={24}>
                            <Col xs={11}>
                                {new Date(createdAt).toLocaleDateString('it-IT', {
                                    weekday: 'long',
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </Col>
                            <Col xs={1} style={{height: "24px"}}>
                                {/* Aggiungi l'icona di eliminazione solo se l'utente corrente è l'autore del commento */}
                                {isCurrentUserCommentAuthor && (
                                <Button variant="link" style={{color: "red", padding: 0, border: 0}} onClick={handleDeleteComment}>
                                    <Trash size={18} />
                                </Button>
                                )}
                            </Col>
                        </Row>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
};