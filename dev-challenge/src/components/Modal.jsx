import './Modal.css'
export const Modal = ({ character, closeModal }) => {
  const { name, image, id } = character
  return (
    <div className='modal' onClick={closeModal}>
      <button onClick={closeModal} className='close-modal'>&times;</button>
      <section className='modal-content' onClick={e => e.stopPropagation()}>
        <img src={image} />
        <article>
          <ul>
            <li><b>Nombre:</b>{name}</li>
            <li><b>Id:</b>{id}</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
