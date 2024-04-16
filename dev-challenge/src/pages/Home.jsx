import { Link } from 'react-router-dom'
import './Home.css'

export const Home = () => {
  return (
    <>
      <header className='header-home'>
        <Link to='/search'> Buscar </Link>
        <Link to='/characters'> Personajes</Link>
        <Link to='#'>Episodios</Link>
      </header>
      <main className='home-main'>
        <h1><span className='rick-span'>Rick</span> and <br /><span className='morty-span'>Morty</span></h1>
        <h3>Informacion sobre los personajes <br /> y episodios de la serie</h3>
      </main>
    </>
  )
}
