import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
// import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

export default function BlogList ({ searchTitle }) {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async (searchTitle) => {
    try {
      // Costruisci l'URL con il parametro di query 'title' se è specificato
      let url = "http://localhost:5001/blogPosts";
      if (searchTitle) {
        url += `?title=${encodeURIComponent(searchTitle)}`;
      }
  
      // Effettua la richiesta GET all'URL costruito
      const response = await fetch(url);
  
      // Gestisci la risposta
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei post del blog");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    fetchPosts(searchTitle);
  }, [searchTitle]);

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