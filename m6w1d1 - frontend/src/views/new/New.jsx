import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Spinner, InputGroup, Alert } from "react-bootstrap";
import "./styles.css";
import RichTextEditor from "./RichTextEditor";

const NewBlogPost = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    cover: "",
    readTime: {
      value: 0,
      unit: ""
    },
    author: {
      name: "",
      avatar: ""
    },
    content: ""
  });

  // Funzione di callback per gestire il contenuto ricevuto dall'editor
  const handleEditorContentChange = (content) => {
    setEditorContent(content);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'value' || id === 'unit') {
      setFormData({
        ...formData,
        readTime: {
          ...formData.readTime,
          [id]: value
        }
      });
    } else if (id === 'name' || id === 'avatar')  {
      setFormData({
        ...formData,
        author: {
          ...formData.author,
          [id]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };

  useEffect(() => {
    // Aggiorna il formData con il contenuto dell'Editor
    setFormData({
      ...formData,
      content: editorContent
    });
  }, [editorContent, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formData);

    try {
      await fetch("http://localhost:5001/blogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));
        setShowSuccessAlert(true);

    } catch (err) {
      console.error("Errore all'invio del form:", err);
      setShowErrorAlert(true);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="new-blog-container">
      {isLoading && (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader mt-3" />
        </div>
      )}
      <Form className="mt-5" onSubmit={handleSubmit}>
        {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              Il post è stato creato con successo!
            </Alert>
        )}
        {showErrorAlert && (
          <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
            Si è verificato un errore durante la creazione del post. Riprova più tardi.
          </Alert>
        )}
        <Form.Group controlId="title" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" onChange={handleInputChange} required/>
        </Form.Group>
        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control placeholder="Category" onChange={handleInputChange} required/>
        </Form.Group>
        <Form.Group controlId="cover" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon3">
              https://example.com/coverImage/
            </InputGroup.Text>
            <Form.Control aria-describedby="basic-addon3" onChange={handleInputChange} required/>
          </InputGroup>
        </Form.Group>
        <Form.Label className="mt-3">Tempo di lettura</Form.Label>
        <Row>
          <Col>
            <Form.Group controlId="value">
              <Form.Control type="number" placeholder="Value" onChange={handleInputChange} required/>
            </Form.Group>            
          </Col>
          <Col>
            <Form.Group controlId="unit">
              <Form.Select aria-label="Default select example" onChange={handleInputChange} required>
                <option value="">Select time's unit</option>
                <option value="Minute">Minute</option>
                <option value="Hour">Hour</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
          <Form.Label className="mt-3">Autore</Form.Label>
        <Row>
          <Col xs={3}>
            <Form.Group controlId="name">
              <Form.Control placeholder="Author" onChange={handleInputChange} required/>
            </Form.Group>
          </Col>
          <Col xs={9}>
            <Form.Group controlId="avatar">
              <InputGroup>
                <InputGroup.Text id="basic-addon3">
                  https://example.com/authorImage/
                </InputGroup.Text>
                <Form.Control aria-describedby="basic-addon3" onChange={handleInputChange} required/>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <RichTextEditor onContentChange={handleEditorContentChange} />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
