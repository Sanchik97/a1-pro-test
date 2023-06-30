import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { GameDetailsPage } from './pages/GameDetailsPage'
import { MainLayout } from './Layouts/MainLayout'
import { useEffect } from 'react'
import { fetchGames } from '@/store/reducers/games'
import { useAppDispatch } from '@/hooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'details/:id/:slug',
    element: <GameDetailsPage />,
  },
])

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGames())
  }, [])

  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  )
}

export default App
