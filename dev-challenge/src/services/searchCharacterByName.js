import { useLazyQuery } from '@apollo/client'
import { SEARCH_CHARACTER } from '../querys/querys'

export function searchCharacterByName (name, onSuccess, onError) {
  const [searchCharacter, { loading, data, error }] = useLazyQuery(SEARCH_CHARACTER)

  const handleSearchCharacter = () => {
    searchCharacter({ variables: { name } })
  }

  if (error) {
    onError(error.message)
    return
  }

  if (loading) {
    return 'Cargando...'
  }

  if (data && data.characters) {
    onSuccess(data.characters.results)
  } else {
    onSuccess([])
  }

  return handleSearchCharacter
}
