import React, { useState } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import logo from "../../assets/logo.png"
import LoginForm from "../../components/login/login-form/LoginForm";
import SigninForm from "../../components/login/signin-form/SigninForm";
import './styles.css'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true); // Stato per gestire se è in corso il login o la registrazione

    // Funzione per gestire il cambio tra login e registrazione
    const toggleAuthMode = () => {
        setIsLogin((prevMode) => !prevMode);
    };

    return (
        <Container fluid id="login-container">
            <Row>
                <Col xs={12} md={6} className="text-center">
                    <img src={logo} alt="Logo" style={{width: "70px", marginBottom: "20px", borderRadius: "5px"}} />
                    <span className="fs-1 ms-2 fst-italic fw-bold text-success">EpiBlog</span>
                    <h2>{isLogin ? "Benvenuto!" : "Crea un nuovo account"}</h2>
                    <p style={{color: "#888", marginBottom: "20px"}}>
                        {isLogin ? "Entra per accedere al tuo account." : "Unisciti a noi e scopri cosa ti aspetta il futuro!"}
                    </p>
                </Col>
                <Col xs={12} md={6} >
                    <h2>{isLogin ? "Login" : "Signup"}</h2>
                    {isLogin ? <LoginForm /> : <SigninForm />}
                    {/* Link per cambiare tra login e registrazione */}
                    <Button variant="link" className="p-0 mt-1" style={{color: "rgb(200, 0, 0)"}} onClick={toggleAuthMode}>
                        {isLogin ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
                    </Button>   
                </Col>
            </Row>
        </Container>
    );
};