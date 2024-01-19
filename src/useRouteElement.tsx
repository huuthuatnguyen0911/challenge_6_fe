import { useRoutes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <div>Home profile</div>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])
  return routeElement
}
