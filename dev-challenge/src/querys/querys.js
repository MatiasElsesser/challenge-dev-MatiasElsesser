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
