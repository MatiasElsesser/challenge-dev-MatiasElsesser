import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <main>
      <h1>Pagina principal</h1>
      <Link to='/search'> Buscar </Link>
      <Link to='/characters'> Personajes</Link>
    </main>
  )
}
