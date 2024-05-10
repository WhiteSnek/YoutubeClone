import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { Header,Footer } from "./components"

function App() {
  const [show,setShow] = useState(true)
  return (
    <>
     <Header setShow={setShow}/>
     <Outlet />
     <Footer /> 
    </>
  )
}

export default App
