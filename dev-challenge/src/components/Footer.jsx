export const Footer = ({ data, handlePages, offset }) => {
  // En caso de paginar con botones de manera manual
  // const handlePages = (page) => {
  //   fetchMore({
  //     variables: { page },
  //     updateQuery: (prevResult, { fetchMoreResult }) => {
  //       return fetchMoreResult
  //     }
  //   })
  //   setOffset(page)
  // }

  return (
    <footer>
      <button
        onClick={() => handlePages(1)}
        disabled={!data.characters.info.prev}
      > {'<<'}
      </button>

      <button
        disabled={!data.characters.info.prev}
        onClick={() => handlePages(data.characters.info.prev)}
      >Atras
      </button>

      <button>{offset}</button>
      <button
        disabled={!data.characters.info.next}
        onClick={() => handlePages(data.characters.info.next)}
      >
        Adelante
      </button>
      <button
        disabled={!data.characters.info.next}
        onClick={() => handlePages(data.characters.info.pages)}
      > {'>>'}
      </button>
    </footer>
  )
}
