import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContextProvider";
import "./styles.css";

export default function CommentForm({ reloadComments }) {
const [commentText, setCommentText] = useState("");
const [loading, setLoading] = useState(false);
const { user, token } = useAuth();

const { id } = useParams();

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim() || loading ) {
    // Se il commento è vuoto, contiene solo spazi o è in fase di caricamento del commento, non fa succedere nulla
    return;
    }

    try {
        setLoading(true);

        // Effettua la fetch per inviare il commento al backend
        const response = await fetch(`http://localhost:5001/blogPosts/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Aggiungi il token JWT dell'utente nell'header
            },
            body: JSON.stringify({
                content: commentText,
                authorId: user._id
            }),
        });

        if (!response.ok) {
            throw new Error("Errore durante l'invio del commento");
        }

        reloadComments();

        // Resetta il campo del commento dopo l'invio
        setCommentText("");
    } catch (error) {
        console.error("Errore durante l'invio del commento:", error);
    } finally {
        setLoading(false); // Imposto lo stato di caricamento su false dopo aver completato la richiesta
    }
};

return (
    <Row className="mt-2 mb-4">
      <Col xs={12} md={8} lg={6} className="mx-auto">
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Group controlId="commentText" className="w-100">
                <Form.Control
                as="textarea"
                rows={3}
                placeholder="Scrivi il tuo commento qui..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-100"
                />
            </Form.Group>
            <Button variant="success" type="submit" className="btn-submit">
                {loading ? <Spinner animation="border" size="sm" /> : 'Invia'}
            </Button>
        </Form>
      </Col>
    </Row>
);
}