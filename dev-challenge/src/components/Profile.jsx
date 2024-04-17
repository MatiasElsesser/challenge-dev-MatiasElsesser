export const Profile = ({ characters }) => {
  return (
    <section
      className='profile-container'
    >
      {characters.map(e => {
        return (
          <article
            className='profile'
            key={e.name}
          >
            <img src={e.image} />
            <p>{e.name}</p>
          </article>
        )
      })}
    </section>
  )
}
