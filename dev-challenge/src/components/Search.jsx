import { useState, useEffect } from 'react'
import { Card } from './Card'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_CHARACTER } from '../querys/querys'
import './Search.css'
import { SearchIcon } from '../icons/SearchIcon'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from './Loader'

export const Search = () => {
  const [getCharacter, { data, error, loading }] = useLazyQuery(SEARCH_CHARACTER)
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

  const handleReset = () => {
    setResults([])
    setSearch('')
  }
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.length >= 1) {
      getCharacter({ variables: { name: search } })
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (data) {
      setResults(data.characters.results)
    }
  }, [data])

  if (loading) return <Loader />

  if (error) return <p>Ocurrio un error en la busqueda</p>
  return (
    <>
      <h1>Busca tu personaje</h1>

      <button onClick={goBack}>
        Regresar
      </button>
      <form
        onSubmit={handleSubmit}
      >
        <div className='searchbar-container'>
          <input
            type='text'
            placeholder='Ingresa el personaje que deseas buscar'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type='submit'
            className='search-btn'
          >
            <SearchIcon />
          </button>
        </div>

        <button
          onClick={handleReset}
          type='reset'
        >Eliminar busqueda
        </button>

      </form>
      {
        results.length > 0 &&
          <h2>Resultados de tu busqueda</h2>
      }
      <section className='search-results'>
        {loading && <p>Cargando...</p>}
        {
          results.map(e => {
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
      </section>
    </>
  )
}
