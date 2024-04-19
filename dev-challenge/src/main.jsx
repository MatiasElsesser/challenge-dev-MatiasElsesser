import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { ContextProvider } from './context/PagesContext.jsx'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </ApolloProvider>
)
