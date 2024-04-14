import { Link } from 'react-router-dom'
import './Home.css'

export const Home = () => {
  return (
    <main className='home-main'>
      <h1>Rick and <br />Morty</h1>
      <section className='home-links-container'>
        <Link to='/search'> Buscar </Link>
        <Link to='/characters'> Personajes</Link>
      </section>
    </main>
  )
}
