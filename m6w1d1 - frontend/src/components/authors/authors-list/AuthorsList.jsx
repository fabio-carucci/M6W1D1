import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import AuthorsItem from '../authors-items/AuthorsItems';
import { useAuth } from '../../../context/AuthContextProvider';

export default function AuthorsList( { searchName }) {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchAuthors = async (searchName) => {
    try {
      let url = "https://m6w1d1-inzr.onrender.com/authors";
      if (searchName) {
        url += `?nome=${encodeURIComponent(searchName)}`;
      }
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Errore durante il recupero degli autori');
      }

      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors(searchName);
  }, [searchName]);

  return (
    <Container>
      {loading ? (
        <p>Caricamento...</p>
      ) : (
        <>
          {error && (
            <Row>
              <Col>
                <Alert variant="danger">{error}</Alert>
              </Col>
            </Row>
          )}
          {authors.length === 0 && (
            <Row>
              <Col>
                <p>Non ci sono autori in questo blog.</p>
              </Col>
            </Row>
          )}
          {authors.length > 0 && (
            <Row>
              {authors.map(author => (
                <Col key={author._id} xs={12} sm={6} md={4} lg={2} className="mb-3">
                  <AuthorsItem {...author} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
}
