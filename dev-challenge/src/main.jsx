import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { EpisodesProvider } from './context/PagesContext.jsx'
import { CharactersProvider } from './context/CharactersContext.jsx'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <CharactersProvider>
    <EpisodesProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </EpisodesProvider>
  </CharactersProvider>
)
