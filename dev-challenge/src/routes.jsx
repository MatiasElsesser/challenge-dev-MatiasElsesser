import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import App from './App'
import { Search } from './components/Search'

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
  }
])
