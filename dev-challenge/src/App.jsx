import './App.css'
import { Card } from './components/Card'
import { mockup } from './mockup'

function App() {

  return (
    <>
      <h1>My Project</h1>
      <main>
        {mockup.data.characters.results.map((e) =>{
          return(
            <Card
            id={e.id}
            image={e.image}
            key={e.id}
            name={e.name} />
          )
        })}
      </main>
    </>
  )
}

export default App
