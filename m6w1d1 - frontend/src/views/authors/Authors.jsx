import React, { useState } from "react";
import { Container, InputGroup, Form,  } from "react-bootstrap";
import "./styles.css";
import AuthorsList from "../../components/authors/authors-list/AuthorsList";
import { X } from "react-bootstrap-icons";

const Authors = (props) => {
  const [searchName, setSearchName] = useState("");

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <Container fluid="sm">
      <h1 className="authors-main-title mb-3 text-success">Gli autori di Epiblog:</h1>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Inserisci il nome dell'autore da cercare"
          value={searchName}
          onChange={handleSearchChange}
        />
        {searchName && (
          <InputGroup.Text onClick={() => setSearchName("")}>
            <X />
          </InputGroup.Text>
        )}
      </InputGroup>
      <AuthorsList searchName={searchName}/>
    </Container>
  );
};

export default Authors;