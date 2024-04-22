import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { AllCharacters } from './pages/AllCharacters'
import { Search } from './pages/Search'
import { Character } from './pages/Character'
import { Episodes } from './pages/Episodes'

export const router = createBrowserRouter([
  {
    path: '/characters',
    element: <AllCharacters />
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
  },
  {
    path: '/episodes',
    element: <Episodes />
  }
])
