import './Modal.css'
export const Modal = ({ character, closeModal }) => {
  const { name, image, id, species, origin, gender } = character
  return (
    <div className='modal' onClick={closeModal}>
      <button onClick={closeModal} className='close-modal'>&times;</button>
      <section className='modal-content' onClick={e => e.stopPropagation()}>
        <img src={image} />
        <article className='modal-items'>
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