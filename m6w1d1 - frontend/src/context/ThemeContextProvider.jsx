import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

// Crea un componente Provider per il contesto
export default function ThemeContextProvider ( {children} ) {
  const [value, setValue] = useState('dark');

  return (
    <ThemeContext.Provider value={{ value, setValue }}>
      {children}
    </ThemeContext.Provider>
  );
};