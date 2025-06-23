import { useState } from 'react'
import './App.css'
import Login from './features/login/Login'
import { RouterProvider } from 'react-router'
import { router } from './routes/Router'

function App() {

  return <RouterProvider router={router}/>
}

export default App
