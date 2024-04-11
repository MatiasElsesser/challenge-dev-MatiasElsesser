import { Link, useParams } from 'react-router-dom'
import { CHARACTER_BY_ID } from '../querys/querys'
import { useQuery } from '@apollo/client'

export const Character = () => {
  const { characterId } = useParams()
  const { data, error, loading } = useQuery(CHARACTER_BY_ID, {
    variables: { id: characterId }
  })

  if (error) {
    console.log(error.name, error.message)
    return <p>Ocurrio un error</p>
  }

  if (loading) return <p>Cargando...</p>

  if (!data || !data.character) return <p>No se encontraron datos</p>

  const { name, image, id, species, gender, status, origin } = data?.character

  return (
    <div>
      <Link to='#' onClick={() => window.history.back()}>Regresar</Link>
      <section>
        <img src={image} />
        <article>
          <ul>
            <li><b>Nombre: </b>{name}</li>
            <li><b>Id: </b>{id}</li>
            <li><b>Especie: </b>{species}</li>
            <li><b>Gender: </b>{gender}</li>
            <li><b>Status: </b>{status}</li>
            <li><b>Origin: </b>{origin.name}</li>
            <li><b>Dimension: </b>{origin.dimension}</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
