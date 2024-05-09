import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideos } from '../features/videoSlice'
import { formatRelativeTime } from '../utils/formatRelativeTime'

const VideosCard = ({item}) =>{
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='flex gap-4 m-4'>
      {isHovered ? (
                <video
                    src={item.videoFile}
                    className='aspect-video w-1/2 object-fit rounded-md bg-gray-900'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    autoPlay
                    muted
                    loop
                />
            ) : (
                <img
                    src={item.thumbnail}
                    className='aspect-video w-1/2 object-fit rounded-md'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            )}
      <div className='flex flex-col gap-4 justify-center'>
        <h1 className='font-bold text-xl'>{item.title}</h1>
        <div className='font-medium text-gray-600 text-sm'>
          <p>{item.owner.fullname}</p>
          <div className='flex text-gray-500 gap-4'>
            <p>{item.views} views</p>
            <p>{formatRelativeTime(item.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const RecommendedVideos = () => {
  const dispatch = useDispatch()
  const [video,setVideo] = useState([])
  useEffect(()=>{
    dispatch(getVideos()).then((result)=>{
      if(result){
        setVideo(result.payload.videos)
      }
    })
  },[])
  console.log(video)
  return (
    <div>
      Recommended videos
      {video.map((item,idx)=>
        (<VideosCard item={item} key={idx} />)
      )}
    </div>
  )
}

export default RecommendedVideos
