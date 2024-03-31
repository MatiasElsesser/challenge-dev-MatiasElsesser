import { useState, useEffect } from 'react'
import { Card } from './Card'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_CHARACTER } from '../querys/querys'
import './Search.css'

export const Search = () => {
  const [getCharacter, { data, error, loading }] = useLazyQuery(SEARCH_CHARACTER)
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    getCharacter({ variables: { name: search } })
  }

  useEffect(() => {
    if (data) {
      setResults(data.characters.results)
    }
  }, [data])

  if (error) return <p>Ocurrio un error en la busqueda</p>
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Ingresa el personaje que deseas buscar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>
      {
        data &&
          <h2>Resultados de tu busqueda</h2>
      }
      <section className='search-results'>
        {loading && <p>Cargando...</p>}
        {
          results.map(item => {
            return (
              <Card
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
