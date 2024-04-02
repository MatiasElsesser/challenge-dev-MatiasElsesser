import { useState, useEffect } from 'react'
import { Card } from './Card'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_CHARACTER } from '../querys/querys'
import './Search.css'
import { SearchIcon } from '../icons/SearchIcon'

export const Search = ({ handleClick }) => {
  const [getCharacter, { data, error, loading }] = useLazyQuery(SEARCH_CHARACTER)
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

  const handleReset = () => {
    setResults([])
    setSearch('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.length >= 1) {
      getCharacter({ variables: { name: search } })
    }
  }

  useEffect(() => {
    if (data) {
      setResults(data.characters.results)
    }
  }, [data])

  if (error) return <p>Ocurrio un error en la busqueda</p>
  return (
    <>
      <h2>Busca tu personaje</h2>
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
          results.map(item => {
            return (
              <Card
                onClick={handleClick}
                key={item.id}
                character={item}
              />
            )
          })
        }
      </section>
    </>
  )
}
