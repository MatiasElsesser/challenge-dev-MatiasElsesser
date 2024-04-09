import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Search } from './components/Search.jsx'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/search',
    element: <Search />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
)
