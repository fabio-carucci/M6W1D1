import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null); // Stato per l'utente autenticato
  const [isLogged, setIsLogged] = useState(false); // Stato per gestire se l'utente è autenticato o meno
  const [logoutTimer, setLogoutTimer] = useState(null); // Timer per il logout automatico

  // Funzione per avviare il timer per il logout automatico
  function startLogoutTimer () {

    const timer = setTimeout(() => {
      logout();
    }, 30 * 60 * 1000); // Logout dopo 30 minuti di inattività

    setLogoutTimer(timer);
  };

  // Funzione per resettare il timer per il logout automatico
  function resetLogoutTimer () {
    clearTimeout(logoutTimer);
    startLogoutTimer();
  };

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

    startLogoutTimer(); // Avvia il timer per il logout automatico
    console.log(logoutTimer);
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);

    localStorage.removeItem("user"); // Rimuovi i dati dell'utente dal localStorage
    localStorage.setItem("isLogged", "false"); // Rimuovi lo stato di autenticazione dal localStorage

    clearTimeout(logoutTimer); // Cancella il timer per il logout automatico
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout, resetLogoutTimer }}>
      {children}
    </AuthContext.Provider>
  );
};