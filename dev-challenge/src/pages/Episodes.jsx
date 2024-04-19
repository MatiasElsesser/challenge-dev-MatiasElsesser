import { useQuery } from '@apollo/client'
import { GET_ALL_EPISODES } from '../querys/querys'
import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { ScrollTopBtn } from '../components/ScrollTopBtn'
import './Episodes.css'
import { Profile } from '../components/Profile'
import { DownIcon } from '../icons/DownIcon'
import { UpIcon } from '../icons/UpIcon'
import { useEpisodesContext } from '../context/PagesContext'

export const Episodes = () => {
  const [offset, setOffset] = useState(1)
  const { totalEpisodes, updateTotalEpisodes, handleClick } = useEpisodesContext()
  const { data, error, loading, fetchMore } = useQuery(GET_ALL_EPISODES, { variables: { page: offset } })
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (data && data.episodes) {
      const newEpisodes = data.episodes.results.filter(
        episode => !totalEpisodes.some(existingEpisode => existingEpisode.id === episode.id)
      )
      updateTotalEpisodes(prev => [...prev, ...newEpisodes])
    }
  }, [data])

  const handleSelectEpisode = (episodeId) => {
    setSelectedEpisode((prevSelectedEpisode) =>
      prevSelectedEpisode === episodeId ? null : episodeId
    )
  }

  const goBack = () => {
    navigate(-1)
  }
  const handleNavigation = (characterId) => {
    navigate(`/characters/${characterId}`)
  }

  if (error) return <p>Ocurrió un error, pero no te preocupes. No es tu culpa</p>
  if (loading) return <Loader />
  return (
    <>
      <h1>Episodios</h1>
      <button onClick={goBack}>Regresar</button>
      <table>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Nombre</th>
            <th>Fecha de estreno</th>
            <th>Personajes</th>
          </tr>
        </thead>
        <tbody>
          {
            totalEpisodes.map((e) => {
              return (
                <React.Fragment key={e.id}>
                  <tr>
                    <th>{e.id}</th>
                    <th>{e.name}</th>
                    <th>{e.air_date}</th>
                    <th
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSelectEpisode(e.id)}
                    >
                      {selectedEpisode
                        ? <UpIcon />
                        : <DownIcon />}
                    </th>

                  </tr>
                  {selectedEpisode === e.id && (
                    <tr className='profile-row'>
                      <td
                        colSpan={4}
                      >
                        <Profile
                          characters={e.characters}
                          navigation={handleNavigation}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })
          }
        </tbody>
      </table>
      {
        data.episodes.info.count > totalEpisodes.length &&
          (
            <button
              onClick={() => handleClick(data, fetchMore, setOffset)}
            >
              {
                loading
                  ? 'Cargando'
                  : 'Mas episodios'
              }
            </button>
          )
      }

      <ScrollTopBtn />
    </>

  )
}
