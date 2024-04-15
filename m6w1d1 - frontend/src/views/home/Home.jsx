import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = (props) => {
  const [searchTitle, setSearchTitle] = useState("");

  const handleSearchChange = (event) => {
    setSearchTitle(event.target.value);
  };

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sull' EpiBlog!</h1>
      <Form.Group controlId="searchTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Inserisci il titolo del blog post da cercare"
          value={searchTitle}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <BlogList searchTitle={searchTitle} />
    </Container>
  );
};

export default Home;