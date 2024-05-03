import React from 'react'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'

const Home = () => {
  const {user} = useSelector((state) => state.user)
  console.log(user)
  return (
    <div className='grid grid-cols-12'>
      <Sidebar />
      <div className='col-span-10 flex justify-center p-12'>
        
        {user ? <div>{user.data.data.user.fullname }</div>:<div className='flex h-1/4 font-semibold text-3xl p-10 border-2 rounded-2xl border-gray-300 bg-gray-200'>
        Login to see videos 
        </div> }
      </div>
    </div>
  )
}

export default Home
