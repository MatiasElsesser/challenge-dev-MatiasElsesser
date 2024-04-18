export const Profile = ({ characters, navigation }) => {
  return (
    <section
      className='profile-container'
    >
      {characters.map(e => {
        return (
          <article
            className='profile'
            key={e.name}
            onClick={() => navigation(e.id)}
          >
            <div className='profile-info'>
              <img src={e.image} />
              <p>{e.name}</p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
