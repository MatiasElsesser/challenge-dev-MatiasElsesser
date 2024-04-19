import { useNavigate, useParams } from 'react-router-dom'
import { CHARACTER_BY_ID } from '../querys/querys'
import { useQuery } from '@apollo/client'
import { Loader } from '../components/Loader'
import './Character.css'

export const Character = () => {
  const { characterId } = useParams()
  const { data, error, loading } = useQuery(CHARACTER_BY_ID, {
    variables: { id: characterId }
  })

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  if (error) {
    console.log(error.name, error.message)
    return <p>Ocurrio un error</p>
  }

  if (loading) return <Loader />

  if (!data || !data.character) return <p>No se encontraron datos</p>

  const { name, image, id, species, gender, status, origin } = data?.character

  const nameArr = name.split('')

  return (
    <div className='character-page'>
      <section>
        <article className='character-header'>
          <h1>
            {
              nameArr.map((e) => {
                return (
                  <span key={e} className='character-span-name'>{e}</span>
                )
              })
            }
          </h1>
          <img src={image} />
        </article>
        <article className='colums-container'>
          <div className='column'>
            <ul className='character-items'>
              <li><b>Especie </b>{species}</li>
              <li><b>Gender </b>{gender}</li>
              <li><b>Status </b>{status}</li>
            </ul>
          </div>

          <div className='column'>
            <ul className='character-items'>
              <li><b>Origin </b>{origin.name}</li>
              <li><b>Id </b>{id}</li>
              {
              origin.dimension &&
                <li><b>Dimension </b>{origin.dimension}</li>
              }
            </ul>
          </div>
        </article>
      </section>
      <button onClick={goBack}>Regresar</button>

    </div>
  )
}
