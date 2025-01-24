import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes/routes.jsx'
import { useSelector } from 'react-redux'

function App() {
  const {isLogin , role} = useSelector(state=> state.user.isLogin)
  return (
    <>
    <RouterProvider router={isLogin ? privateRoutes : publicRoutes}></RouterProvider>
    </>
  )
}

export default App