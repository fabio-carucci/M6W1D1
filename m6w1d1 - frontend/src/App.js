import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Authors from "./views/authors/Authors";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import Login from "./views/login/Login";
import Profile from "./views/profile/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContextProvider";

function App() {
  const { isLogged } = useAuth(); // Imposta a true se l'utente è autenticato, altrimenti false

  return (
    <Router>
      {/* Mostra la navbar solo se l'utente è autenticato */}
      {isLogged && <NavBar />}
      <Routes>
        {/* Mostra la pagina di login come prima pagina solo se l'utente non è autenticato */}
        {!isLogged && <Route path="/" element={<Login />} />}
        {/* Altrimenti, mostra le altre pagine del sito */}
        {isLogged && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/new" element={<NewBlogPost />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        {/* Reindirizza l'utente alla home se prova ad accedere alla pagina di login dopo aver effettuato l'accesso */}
        <Route path="/login" element={<Navigate to="/" />} />
      </Routes>
      <Footer />  
    </Router>
  );
}

export default App;