import { useState } from 'react'
import './App.css'
import { Card } from './components/Card'
import { mockup } from './mockup'
import { Modal } from './components/Modal'

function App () {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [characters, setCharacters] = useState(mockup.data.characters.results)

  const handleClick = (character) => {
    setSelectedCharacter(character)
    console.log(selectedCharacter)
  }
  return (
    <>
      <form>
        <input
          type='text'
          placeholder='Ingresa el personaje que deseas buscar'
        />
        <button>Buscar</button>
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
        {characters.map((e) => {
          return (
            <Card
              onClick={handleClick}
              character={e}
              key={e.id}
            />
          )
        })}
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
