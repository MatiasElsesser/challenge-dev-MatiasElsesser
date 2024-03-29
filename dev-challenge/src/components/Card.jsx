import './Card.css'

export const Card = ({ character, onClick }) => {
  const { id, image, name } = character
  return (
    <article
      className='card-container'
      onClick={() => onClick(character)}
    >
      <span>{id}</span>
      <img src={image} />
      <h3>{name}</h3>
    </article>
  )
}
