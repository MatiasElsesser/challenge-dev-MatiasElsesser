import { createContext } from 'react'

export const PagesContext = createContext()

export const ContextProvider = ({ children }) => {
  <PagesContext.Provider>
    {children}
  </PagesContext.Provider>
}
