import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo.png"
import LoginForm from "../../components/login/login-form/LoginForm";
import SignUpForm from "../../components/login/signup-form/SignUpForm";
import './styles.css'

export default function Auth() {
    const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {
        setIsSessionExpired(localStorage.getItem('isSessionExpired'));
      
        if (isSessionExpired) {
      
          // Imposta sessionExpired su false dopo 10 secondi
          const timeoutId = setTimeout(() => {
            setIsSessionExpired(false);
            localStorage.removeItem('isSessionExpired'); // Rimuove il flag di sessione scaduta dal localStorage
          }, 30000); // 30 secondi
      
          return () => clearTimeout(timeoutId);
        }
      }, [isSessionExpired]);

    const handleCloseToastMessage = () => {
        setIsSessionExpired(false);
        localStorage.removeItem('isSessionExpired');
    };
      
    return (
        <Container fluid id="login-container">
            <Row>
                <Col xs={12} md={6} className="text-center">
                    <img src={logo} alt="Logo" style={{width: "70px", marginBottom: "20px", borderRadius: "5px"}} />
                    <span className="fs-1 ms-2 fst-italic fw-bold text-success">EpiBlog</span>
                    <h2>Benvenuto!</h2>
                    <p style={{color: "#888", marginBottom: "20px"}}>Entra per accedere al tuo account.</p>
                </Col>
                <Col xs={12} md={6}>
                    <div className="d-flex flex-column align-items-center">
                        <h2>Login</h2>
                        <LoginForm />
                        <SignUpForm />
                    </div>
                </Col>
            </Row>
        {/* Mostra il toast quando sessionExpired è true */}
        {isSessionExpired && (
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div className="toast d-block" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto text-danger">Attenzione</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={handleCloseToastMessage}></button>
                    </div>
                    <div className="toast-body">
                        La sessione è scaduta. Si prega di effettuare nuovamente il login.
                    </div>
                </div>
            </div>
        )}
        </Container>
    );
};