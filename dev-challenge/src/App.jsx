import { useState, useEffect } from 'react'
import './App.css'
import { Card } from './components/Card'
import { useQuery } from '@apollo/client'
import { GET_ALL_CHARACTERS } from './querys/querys'
import { ScrollTopBtn } from './components/ScrollTopBtn'
import { Filters } from './components/Filters'
import { useFilters } from './hooks/useFilters'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from './components/Loader'

function App () {
  const [offset, setOffset] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const { data, error, loading, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
    variables: { page: offset }
  })
  const {
    filteredCharacters,
    filters,
    setCharacters,
    setFilters,
    characters
  } = useFilters()

  const navigate = useNavigate()

  useEffect(() => {
    if (data && data.characters.results) {
      const newCharacters = data.characters.results.filter(
        character => !characters.some(existingCharacter => existingCharacter.id === character.id)
      )
      setCharacters(prev => [...prev, ...newCharacters])
    }
  }, [data])

  //  Scroll event
  useEffect(() => {
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

  // fetching
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

  const goBack = () => {
    navigate(-1)
  }

  if (error) {
    console.log(error)
    return <p>Ocurrio un error</p>
  }
  if (loading) return <Loader />

  return (
    <>
      <h1>Personajes</h1>

      <button onClick={goBack}>
        Regresar
      </button>
      <Filters
        data={data}
        filters={filters}
        setFilters={setFilters}
      />

      <main>
        {
          filteredCharacters.map((e) => {
            return (
              <Link key={e.id} to={`/characters/${e.id}`}>
                <Card
                  character={e}
                  key={e.id}
                />
              </Link>
            )
          })
        }
      </main>

      <ScrollTopBtn />
    </>
  )
}

export default App
