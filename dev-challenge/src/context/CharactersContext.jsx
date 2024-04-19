import { createContext, useState, useContext, useEffect } from 'react'

const CharactersContext = createContext()

export const useCharactersContext = () => useContext(CharactersContext)

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' })

  const updateTotalCharacters = (newCharacters) => {
    setCharacters(prev => [...prev, newCharacters])

    useEffect(() => {
      const filteredCharacters = characters.filter((character) =>
        Object.entries(filters).every(([key, value]) => !value || character[key] === value)
      )

      setFilteredCharacters(filteredCharacters)
    }, [characters, filters])
  }
  return (
    <CharactersContext.Provider
      value={{
        characters,
        filteredCharacters,
        updateTotalCharacters,
        setFilters,
        filters
      }}
    >
      {children}
    </CharactersContext.Provider>
  )
}
