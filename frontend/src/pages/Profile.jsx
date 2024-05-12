import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserByUsername } from '../features/userSlice'
import { IconContext } from "react-icons/lib";
import { CiBellOn } from "react-icons/ci";
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const {username} = useParams()
  const [thisUser, setThisUser] = useState({})
  const {user} = useSelector(state=>state.user)
  const show = useSelector(state=>state.show)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserByUsername(username)).then((result)=>{
      if(result.payload){
        setThisUser(result.payload)
      }
    })
  },[])

  return (
    <div className='grid grid-cols-12'>
      {show && <div className="col-span-2 bg-white"><Sidebar /></div>}
      <div className={`flex gap-10 p-10 ${show?"col-span-10":"col-span-12"}`}>
        <img src={thisUser.avatar} alt='avatar' className='aspect-square h-40 rounded-full object-cover' />
        <div className=''>
          <h1 className='font-bold text-4xl'>{thisUser.fullname}</h1>
          <p className='font-medium text-gray-500'>@{thisUser.username}</p>
          <p className='font-medium text-gray-500'>More about this Channel</p>
          {username === user.username ? <button className='bg-gray-100 px-4 py-2 mt-4 rounded-full hover:bg-gray-200 '>Customise Channel</button>:<button className='bg-gray-100 px-4 py-2 mt-4 flex gap-2 justify-center rounded-full hover:bg-gray-200'><IconContext.Provider value={{ size: "25px" }}>
            <CiBellOn />
          </IconContext.Provider>Subscribe</button>}
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Profile
