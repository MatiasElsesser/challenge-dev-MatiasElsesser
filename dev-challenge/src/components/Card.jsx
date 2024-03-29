import './Card.css'

export const Card =({name, image, id}) =>{
  return(
    <article className='card-container'>
      <span>{id}</span>
      <img src={image} />
      <h3>{name}</h3>
    </article>
  )
}