import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const context = createContext({isAuthenticated: false});

// eslint-disable-next-line react-refresh/only-export-components
const AppWrapper = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <context.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      <App />
    </context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
