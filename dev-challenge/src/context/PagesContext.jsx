import { createContext, useState, useContext } from 'react'

const EpisodesContext = createContext()

export const useEpisodesContext = () => useContext(EpisodesContext)

export const EpisodesProvider = ({ children }) => {
  const [totalEpisodes, setTotalEpisodes] = useState([])
  const [offset, setOffset] = useState(1)

  const handleClick = (data, fetchMore, setOffset) => {
    const loadNextPage = async () => {
      try {
        const moreEpisodes = await fetchMore({
          variables: { page: data.episodes.info.next }
        })

        const ep = await moreEpisodes.data.episodes.results

        updateTotalEpisodes(prev => [...prev, ...ep])

        setOffset(data.episodes.info.next)
      } catch (error) {
        console.log(error)
      }
    }
    loadNextPage()
  }

  const updateTotalEpisodes = (newTotal) => {
    setTotalEpisodes(newTotal)
  }

  return (
    <EpisodesContext.Provider
      value={{ totalEpisodes, updateTotalEpisodes, handleClick, offset, setOffset }}
    >
      {children}
    </EpisodesContext.Provider>
  )
}
