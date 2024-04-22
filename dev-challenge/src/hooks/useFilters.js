import { useState, useEffect } from 'react'

export const useFilters = (characters) => {
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' })

  useEffect(() => {
    const filteredCharacters = characters.filter((character) =>
      Object.entries(filters).every(([key, value]) => !value || character[key] === value)
    )

    setFilteredCharacters(filteredCharacters)
  }, [characters, filters])

  return { filteredCharacters, setFilters, filters }
}
