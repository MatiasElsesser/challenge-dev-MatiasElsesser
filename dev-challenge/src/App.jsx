import { useState, useEffect } from 'react'
import './App.css'
import { Card } from './components/Card'
import { Modal } from './components/Modal'
import { useQuery } from '@apollo/client'
import { GET_ALL_CHARACTERS } from './querys/querys'
import { Search } from './components/Search'
import { Footer } from './components/Footer'

function App () {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [characters, setCharacters] = useState([])
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' })
  const [offset, setOffset] = useState(1)
  const { data, error, loading, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
    variables: { page: offset }
  })

  const handlePages = (page) => {
    fetchMore({
      variables: { page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return fetchMoreResult
      }
    })
    setOffset(page)
  }

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
    // eslint-disable-next-line no-return-assign
    document.querySelectorAll('select').forEach(sel => sel.value = '')
  }

  const filteredCharacters = characters.filter((character) =>
    Object.entries(filters).every(([key, value]) => !value || character[key] === value)
  )

  const handleClick = (character) => {
    setSelectedCharacter(character)
  }

  useEffect(() => {
    if (data && data.characters.results) {
      setCharacters(data.characters.results)
    }
  }, [data])

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
      <div>
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

        <button onClick={resetFilters}> Reset filters</button>
      </div>

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

      <Footer
        data={data}
        handlePages={handlePages}
        offset={offset}
      />

      {
        selectedCharacter &&
          <Modal
            closeModal={() => setSelectedCharacter(null)}
            character={selectedCharacter}
          />
      }
    </>
  )
}

export default App
