import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stato per l'utente autenticato
  const [isLogged, setIsLogged] = useState(false); // Stato per gestire se l'utente è autenticato o meno

  // Controlla se l'utente è già autenticato al caricamento della pagina utilizzando localStorage
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLogged");

    if (loggedUser !== null && isLoggedIn === "true") {
      setUser(JSON.parse(loggedUser));
      setIsLogged(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLogged(true);
    localStorage.setItem("user", JSON.stringify(userData)); // Memorizza i dati dell'utente nel localStorage
    localStorage.setItem("isLogged", "true"); // Memorizza lo stato di autenticazione nel localStorage
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    localStorage.removeItem("user"); // Rimuovi i dati dell'utente dal localStorage
    localStorage.setItem("isLogged", "false"); // Rimuovi lo stato di autenticazione dal localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};