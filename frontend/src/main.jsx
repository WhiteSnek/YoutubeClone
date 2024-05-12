import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Home,Profile,Login,Register,Video, History, PlayLists, SpecificPlaylist} from './pages'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './app/store.js'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

axios.defaults.baseURL = import.meta.env.VITE_SERVER;
let persistor = persistStore(store)
const Layout = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route path='' element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path=':username' element={<Profile/>} />
        <Route path='videos/:id' element={<Video/>} />
        <Route path='history' element={<History/>} />
        <Route path='playlist' element={<PlayLists/>} />
        <Route path='playlist/:playlistId' element={<SpecificPlaylist/>} />
      </Route>
    )
  )
  return (
      <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <Layout />
    </PersistGate>
    
  </Provider>,
)
