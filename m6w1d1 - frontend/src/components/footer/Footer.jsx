import React from "react";
import { Container } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: "white"
      }}
    >
      <Container>{`${new Date().getFullYear()} - © EpiBlog | Designed by Fabio Carucci .`}</Container>
    </footer>
  );
};

export default Footer;
