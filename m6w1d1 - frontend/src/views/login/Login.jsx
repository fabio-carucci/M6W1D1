import React, { useEffect, useState } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import logo from "../../assets/logo.png"
import LoginForm from "../../components/login/login-form/LoginForm";
import SignUpForm from "../../components/login/signup-form/SignUpForm";
import { useAuth } from '../../context/AuthContextProvider';
import './styles.css'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true); // Stato per gestire se è in corso il login o la registrazione

    const { sessionExpired, setSessionExpired } = useAuth();

    useEffect(() => {
        const isSessionExpired = localStorage.getItem('sessionExpired');
      
        if (isSessionExpired) {
          setSessionExpired(true);
      
          // Imposta sessionExpired su false dopo 10 secondi
          const timeoutId = setTimeout(() => {
            setSessionExpired(false);
            localStorage.removeItem('sessionExpired'); // Rimuove il flag di sessione scaduta dal localStorage
          }, 10000); // 10 secondi
      
          return () => clearTimeout(timeoutId);
        }
      }, []);
      

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
                    {isLogin ? <LoginForm /> : <SignUpForm />}
                    {/* Link per cambiare tra login e registrazione */}
                    <Button variant="link" className="p-0 mt-1" style={{color: "rgb(200, 0, 0)"}} onClick={toggleAuthMode}>
                        {isLogin ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
                    </Button>   
                </Col>
            </Row>
        {/* Mostra il toast quando sessionExpired è true */}
        {sessionExpired && (
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div className="toast d-block" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto text-danger">Attenzione</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setSessionExpired(false)}></button>
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