import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import App from './App'
import { Search } from './components/Search'
import { Character } from './pages/Character'

export const router = createBrowserRouter([
  {
    path: '/characters',
    element: <App />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/characters/:characterId',
    element: <Character />
  }
])
