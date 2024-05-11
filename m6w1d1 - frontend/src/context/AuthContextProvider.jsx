import React, { createContext, useState, useContext, useEffect } from "react";
import TokenExpirationAlert from "../components/token-expiration-alert/TokenExpirationAlert";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

  const [token, setToken] = useState(null); // Stato per memorizzare il token dell'utente
  const [user, setUser] = useState(null); // Stato per memorizzare l'utente autenticato
  const [isLogged, setIsLogged] = useState(false); // Stato per gestire se l'utente è autenticato o meno
  const [sessionExpired, setSessionExpired] = useState(false); // Stato per gestire l'avviso di sessione scaduta

  // Funzione per controllare la validità del token
  const checkTokenValidity = () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return; // Se non c'è un token salvato, esci

    // Decodifica il token per ottenere la data di scadenza
    const { exp } = JSON.parse(atob(storedToken.split('.')[1]));

    // Calcola il timestamp attuale
    const currentTime = Math.floor(Date.now() / 1000);

    // Calcola il timestamp di scadenza del token meno 10 minuti
    const tokenExpirationMinus10Minutes = exp - 600; // 600 secondi = 10 minuti

    // Se il timestamp attuale è maggiore del timestamp di scadenza meno 10 minuti,
    // imposta sessionExpired a true e mostra il modal TokenExpirationAlert
    if (currentTime >= tokenExpirationMinus10Minutes) {
      setSessionExpired(true);
    }
  };

// Controlla se l'utente è già autenticato al caricamento della pagina utilizzando localStorage
useEffect(() => {
  const loggedUser = localStorage.getItem("user");
  const isLoggedIn = localStorage.getItem("isLogged");
  const userToken = localStorage.getItem("token");

  if (loggedUser !== null && userToken !== null && isLoggedIn === "true") {
    setUser(JSON.parse(loggedUser));
    setIsLogged(true);
    setToken(userToken);

    // Controlla se il token è scaduto
    const { exp } = JSON.parse(atob(userToken.split('.')[1]));
    if (Date.now() >= exp * 1000) {
      logout();
    }
  }
}, []);


  useEffect(() => {
    // Esegue il controllo della validità del token ogni 5 minuti
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 5 * 60 * 1000); // 5 minuti

    // Pulisce l'intervallo quando il componente si smonta
    return () => clearInterval(interval);
  }, []);

  const login = (token, userData) => {
    setToken(token);
    setIsLogged(true);
    setUser(userData);
    setSessionExpired(false);

    localStorage.setItem("token", token); // Memorizza il token di accesso dell'utente nel localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Memorizza i dati dell'utente nel localStorage
    localStorage.setItem("isLogged", "true"); // Memorizza lo stato di autenticazione nel localStorage
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);

    localStorage.removeItem("token") // Rimuovi i dati dell'utente dal localStorage
    localStorage.removeItem("user"); // Rimuovi i dati dell'utente dal localStorage
    localStorage.setItem("isLogged", "false"); // Rimuovi lo stato di autenticazione dal localStorage

    // Reindirizza alla pagina di login
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, isLogged, login, logout, sessionExpired, setSessionExpired }}>
      {children}
      {sessionExpired && <TokenExpirationAlert logout={logout} user={user} token={token} setToken={setToken} setSessionExpired={setSessionExpired}/>}
    </AuthContext.Provider>
  );
};