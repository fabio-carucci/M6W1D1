import React, { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import CommentsItem from "../comments-item/CommentsItem";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContextProvider"

export default function CommentList() {
  const [comments, setComments] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const { token } = useAuth();

  const fetchComments = async () => {
    try {
      let url = `http://localhost:5001/blogPosts/${id}/comments`;
  
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
      setComments(data.comments);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (comments.length === 0) {
    return <p>Nessun commento trovato.</p>;
  }

  return (
    <Row>
      {comments.map((comment, i) => (
        <Col
          key={`item-${i}`}
          md={6}
          xs={12}
          style={{
            marginBottom: 50,
          }}
        >
          <CommentsItem key={comment.createdBy} {...comment} />
        </Col>
      ))}
    </Row>
  );
};
