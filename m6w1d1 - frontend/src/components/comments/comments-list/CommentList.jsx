import React, { useState, useEffect } from "react";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import CommentsItem from "../comments-item/CommentsItem";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContextProvider"

export default function CommentList( { isReloadingComments, setIsReloadingComments, reloadComments } ) {
  const [comments, setComments] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const { token } = useAuth();

  const fetchComments = async () => {
    try {
      setLoading(true);

      let url = `https://m6w1d1-inzr.onrender.com/blogPosts/${id}/comments`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
        
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei commenti del blog");
      }
      const data = await response.json();

      // Ordina i commenti per createdAt in ordine decrescente
      const sortedComments = data.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setComments(sortedComments);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      if (isReloadingComments) {
        setIsReloadingComments(false);
      }
    }
  };  

  useEffect(() => {
    if (isReloadingComments) {
      fetchComments();
    }
  }, [isReloadingComments]);
  

  useEffect(() => {
    fetchComments();
  }, []);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (comments.length === 0) {
    return <p>Nessun commento trovato.</p>;
  }

  return (
    <Row>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        comments.map((comment, i) => (
          <Col
            key={`item-${i}`}
            md={6}
            xs={12}
            className="mb-3"
          >
            <CommentsItem key={comment.createdBy} {...comment} reloadComments={reloadComments} />
          </Col>
        ))
      )}
    </Row>
  );  
};
