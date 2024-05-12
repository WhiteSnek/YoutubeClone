import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserHistory } from '../features/userSlice'
import { VideosCard } from '../components/RecommendedVideos'
import Sidebar from '../components/Sidebar'

const History = () => { 
    const [history,setHistory] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUserHistory()).then((result)=>{
            if(result.payload){
                setHistory(result.payload)
            }
        })
    },[])
    console.log(history)
  return (
    <div className='grid grid-cols-12 gap-40'>
        <div className='col-span-3'>
        <Sidebar />
        </div>
    
    <div className='col-span-6'>
        <h1 className='font-bold text-3xl p-4'>
            Watch History
        </h1>
      {history.map((item,idx)=>(
        <VideosCard item={item} key={idx} />
      ))}
    </div>
    </div>
  )
}

export default History
