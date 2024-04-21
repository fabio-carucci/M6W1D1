import React, { useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { X } from "react-bootstrap-icons";

const Home = (props) => {
  const [searchTitle, setSearchTitle] = useState("");

  const handleSearchChange = (event) => {
    setSearchTitle(event.target.value);
  };

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3 text-success">Benvenuto sull' EpiBlog!</h1>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Inserisci il titolo del blog post da cercare"
          value={searchTitle}
          onChange={handleSearchChange}
        />
        {searchTitle && (
          <InputGroup.Text onClick={() => setSearchTitle("")}>
            <X />
          </InputGroup.Text>
        )}
      </InputGroup>
      <BlogList searchTitle={searchTitle} />
    </Container>
  );
};

export default Home;