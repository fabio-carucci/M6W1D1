import React, { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

export default function BlogList({ searchTitle }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async (searchTitle) => {
    try {
      let url = "http://localhost:5001/blogPosts";
      if (searchTitle) {
        url += `?title=${encodeURIComponent(searchTitle)}`;
      }
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei post del blog");
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchPosts(searchTitle);
  }, [searchTitle]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (posts.length === 0) {
    return <p>Nessun post trovato.</p>;
  }

  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};
