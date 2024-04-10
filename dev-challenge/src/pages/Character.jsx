import { Link } from 'react-router-dom'

export const Character = ({ character }) => {
  const { name, image, id, species, origin, gender } = character

  return (
    <div>
      <Link to='#' onClick={window.history.back()}>Regresar</Link>
      <section>
        <img src={image} />
        <article>
          <ul>
            <li><b>Nombre: </b>{name}</li>
            <li><b>Id: </b>{id}</li>
            <li><b>Especie: </b>{species}</li>
            <li><b>Gender: </b>{gender}</li>
            <li><b>Origen: </b>{origin.name}</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
