import { gql } from '@apollo/client'

export const GET_ALL_CHARACTERS =
    gql`
    query allCharacters($page: Int) {
      characters(page: $page){
        info{
          next
          prev
          pages
        }
        results{
          id
          gender
          image
          name
          status
          species
          origin {
            name
          }
        }
      }
    } `

export const SEARCH_CHARACTER =
gql`
  query searchCharacter($name: String!) {
    characters(filter:{name: $name}){
      results{
        id
        gender
        status
        species
        image
        name
        origin {
          name
        }
      }
    }
  }
  `
export const CHARACTER_BY_ID =
gql`
query getCharacter($id: ID!) {
  character(id: $id){
    name
    id
    image
    status
    type
    species
    gender
    origin {
      name
      dimension
    }
  }
}
`

export const GET_ALL_EPISODES =
gql`
query getEpisodes($page: Int) {
  episodes(page:$page){
    info{
      next
    }
    results {
      name
      episode
      id
      air_date
      characters{
        name
      }
    }
  }
}`
