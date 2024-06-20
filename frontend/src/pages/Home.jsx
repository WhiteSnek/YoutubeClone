import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import Videos from '../components/Videos'
import { getCurrentUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
// TODO: user is logged in while the in the backend it's logged out. fixed that
const Home = () => {
  const {user} = useSelector((state) => state.user)
  const show = useSelector((state) => state.show)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useEffect(()=>{
  //   dispatch(getCurrentUser()).then((result)=>{
  //     if(result.error){
  //       navigate("/login")
  //     }
  //   })
  // },[])
  return (
    <div className='grid grid-cols-12'>
      {show && <Sidebar />}
      <div className='col-span-10 flex justify-center p-12'>
        
        {user ? <Videos />:<div className='flex h-1/4 font-semibold text-3xl p-10 border-2 rounded-2xl border-gray-300 bg-gray-200'>
        Login to see videos 
        </div> }
      </div>
    </div>
  )
}

export default Home
