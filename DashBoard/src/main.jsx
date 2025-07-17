import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const context = createContext({isAuthenticated: false});

// eslint-disable-next-line react-refresh/only-export-components
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
    </context.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
