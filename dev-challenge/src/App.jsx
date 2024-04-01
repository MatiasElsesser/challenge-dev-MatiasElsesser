import { useState, useEffect } from 'react'
import './App.css'
import { Card } from './components/Card'
import { Modal } from './components/Modal'
import { useQuery } from '@apollo/client'
import { GET_ALL_CHARACTERS } from './querys/querys'
import { Search } from './components/Search'
import { ScrollTopBtn } from './components/ScrollTopBtn'
// import { Footer } from './components/Footer'

function App () {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' })
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
    //  Scroll event
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight)

      const minDistanceToBottom = 100

      if (distanceToBottom < minDistanceToBottom && !isFetching) {
        setIsFetching(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetching])

  useEffect(() => {
    // fetching
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

  useEffect(() => {
    const filteredCharacters = characters.filter((character) =>
      Object.entries(filters).every(([key, value]) => !value || character[key] === value)
    )

    setFilteredCharacters(filteredCharacters)
  }, [characters, filters])

  const extractOptions = (key) => {
    const options = new Set(data.characters.results.map((character) => character[key]))
    return [...options]
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const resetFilters = () => {
    setFilters({ status: '', species: '', gender: '' })
  }

  const handleClick = (character) => {
    setSelectedCharacter(character)
  }

  if (error) {
    console.log(error)
    return <p>Ocurrio un error</p>
  }
  if (loading) return <p>Cargando resultados...</p>

  return (
    <>
      <Search
        handleClick={handleClick}
      />
      <h2>Personajes</h2>
      <form>
        <select name='status' defaultValue='' onChange={handleFilterChange}>
          <option value='' disabled selected>Status...</option>
          {
            extractOptions('status').map((status) => {
              return (
                <option key={status} value={status}>{status}</option>
              )
            })
          }
        </select>

        <select name='species' onChange={handleFilterChange} defaultValue=''>
          <option value='' disabled selected>Especie...</option>
          {
            extractOptions('species').map((species) => {
              return (
                <option key={species} value={species}>{species}</option>
              )
            })
          }
        </select>

        <select name='gender' onChange={handleFilterChange} defaultValue=''>
          <option value='' disabled selected>Genero</option>
          {
            extractOptions('gender').map((gender) => {
              return (
                <option key={gender} value={gender}>{gender}</option>
              )
            })
          }
        </select>

        <button type='reset' onClick={resetFilters}> Reset filters</button>
      </form>

      <main>
        {
          filteredCharacters.map((e) => {
            return (
              <Card
                onClick={handleClick}
                character={e}
                key={e.id}
              />
            )
          })
        }
      </main>

      {/* <Footer
        data={data}
        handlePages={handlePages}
        offset={offset}
      /> */}

      {
        selectedCharacter &&
          <Modal
            closeModal={() => setSelectedCharacter(null)}
            character={selectedCharacter}
          />
      }
      <ScrollTopBtn />
    </>
  )
}

export default App
