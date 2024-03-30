import { useState, useEffect } from 'react'
import './App.css'
import { Card } from './components/Card'
import { Modal } from './components/Modal'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_CHARACTER } from './querys/querys'
// import { searchCharacterByName } from './services/searchCharacterByName'

function App () {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [characters, setCharacters] = useState([])
  // const { data, error, loading } = useQuery(GET_ALL_CHARACTERS)
  const [searchCharacter, { data, error, loading }] = useLazyQuery(SEARCH_CHARACTER)

  const handleClick = (character) => {
    setSelectedCharacter(character)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    searchCharacter({ variables: { name: searchTerm } })
    console.log(data)
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
      <form>
        <input
          type='text'
          placeholder='Ingresa el personaje que deseas buscar'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        <div>
          <select>
            <option value='' disabled selected>Status...</option>
          </select>

          <select>
            <option value='' disabled selected>Especie...</option>
          </select>

          <select>
            <option value='' disabled selected>Genero</option>
          </select>

          <button> Reset filters</button>
        </div>
      </form>
      <main>
        {
          characters.map((e) => {
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
