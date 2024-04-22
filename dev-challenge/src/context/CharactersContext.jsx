import { createContext, useState, useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_CHARACTERS } from '../querys/querys'

const CharactersContext = createContext()

export const useCharactersContext = () => useContext(CharactersContext)

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([])
  const [offset, setOffset] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const { data, error, loading, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
    variables: { page: offset }
  })

  useEffect(() => {
    if (data && data.characters.results) {
      const newCharacters = data.characters.results.filter(
        character => !characters.some(existingCharacter => existingCharacter.id === character.id)
      )
      setCharacters(prev => [...prev, ...newCharacters])
    }
  }, [data])

  useEffect(() => {
    if (!isFetching || loading || !data.characters.info.next) return

    const loadNextPage = async () => {
      try {
        const newCharactersData = await fetchMore({
          variables: { page: data.characters.info.next }
        })

        const newCharacters = newCharactersData.data.characters.results

        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...newCharacters
        ])

        setOffset(data.characters.info.next)
        setIsFetching(false)
      } catch (error) {
        console.error('Error al cargar la siguiente página:', error)
      } finally {
        setIsFetching(false)
      }
    }

    loadNextPage()
  }, [isFetching, fetchMore, loading, data, characters])

  return (
    <CharactersContext.Provider
      value={{
        error, loading, characters, setIsFetching, isFetching, data
      }}
    >
      {children}
    </CharactersContext.Provider>
  )
}
