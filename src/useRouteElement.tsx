import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout/MainLayout'
import MainPage from './pages/MainPage/MainPage'
import EditPage from './pages/EditPage/EditPage'
import ChatPage from './pages/ChatPage/ChatPage'

export default function useRouteElement() {
  function ProtectedRoutes() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoutes() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }

  const routeElement = useRoutes([
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <MainPage />
            </MainLayout>
          )
        },
        {
          path: '/edit',
          element: (
            <MainLayout>
              <EditPage />
            </MainLayout>
          )
        },
        {
          path: '/chat',
          element: <ChatPage />
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoutes />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    }
  ])
  return routeElement
}
