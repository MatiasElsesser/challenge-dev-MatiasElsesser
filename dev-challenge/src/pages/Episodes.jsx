import { useQuery } from '@apollo/client'
import { GET_ALL_EPISODES } from '../querys/querys'
import { useState } from 'react'
import { Loader } from '../components/Loader'

export const Episodes = () => {
  const [offset, setOffset] = useState(1)
  const { data, error, loading, fetchMore } = useQuery(GET_ALL_EPISODES, { variables: { page: offset } })

  if (loading) return <Loader />
  if (error) return <p>Ocurrió un error, pero no te preocupes. No es tu culpa</p>

  return (
    <h1>Episodios</h1>

  )
}
