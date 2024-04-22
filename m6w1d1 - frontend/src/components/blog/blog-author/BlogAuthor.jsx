import React, { useState, useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { PersonCircle } from 'react-bootstrap-icons';
import "./styles.css";

export default function BlogAuthor ({author}) {

  const { nome, avatar } = author;

  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        {/* Se l'avatar non è presente, inserisci l'icona di default */}
        {avatar ? <Image className="blog-author" src={avatar} roundedCircle /> : <PersonCircle style={{width: "40px",height: "40px"}}/>}
      </Col>
      <Col>
        <div>di</div>
        <h6>{nome}</h6>
      </Col>
    </Row>
  );
};