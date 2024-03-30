import { gql } from '@apollo/client'

export const GET_ALL_CHARACTERS =
gql`
  query allCharacters {
      characters(page:1){
          info{
              next
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
    }
  `

export const SEARCH_CHARACTER =
gql`
  query searchCharacter($name: String!) {
    characters(filter:{name: $name}){
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
  }
  `
