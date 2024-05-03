import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Home,Profile,Login,Register} from './pages'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './app/store.js'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER;

const Layout = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route path='' element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='profile' element={<Profile/>} />
      </Route>
    )
  )
  return (
      <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Layout />
  </Provider>,
)
