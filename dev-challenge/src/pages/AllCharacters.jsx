import { useEffect } from 'react'
import './AllCharacters.css'
import { Card } from '../components/Card'
import { ScrollTopBtn } from '../components/ScrollTopBtn'
import { Filters } from '../components/Filters'
import { useFilters } from '../hooks/useFilters'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { useCharactersContext } from '../context/CharactersContext'

export function AllCharacters () {
  const { error, loading, data, characters, isFetching, setIsFetching } = useCharactersContext()
  const { filteredCharacters, setFilters, filters } = useFilters(characters)
  console.log(data)
  const navigate = useNavigate()
  console.log(characters)

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
