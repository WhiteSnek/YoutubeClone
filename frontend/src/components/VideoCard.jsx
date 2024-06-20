import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../utils/formatRelativeTime';
const VideoCard = ({item}) => {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to={`/videos/${item._id}`} className='col-span-4 h-1/2 p-4 rounded-xl'>
        
      {isHovered ? (
                <video
                    src={item.videoFile}
                    className='aspect-video w-full object-fit rounded-xl bg-gray-900'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    autoPlay
                    muted
                    loop
                />
            ) : (
                <img
                    src={item.thumbnail}
                    className='aspect-video w-full object-fit rounded-xl'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            )}
      <div className='flex gap-4 mt-4'>
        <img src={item.owner.avatar} alt='avatar' className='h-8 w-8 rounded-full object-cover' />
        <div>
        <h1 className='font-bold text-lg'>{item.title}</h1>
        <p className='text-gray-500 font-medium'>{item.owner.fullname}</p>
        <div className='flex gap-3 font-medium text-gray-500'>
            <p>{item.views} views</p>
            <p>{formatRelativeTime(item.createdAt)}</p>
        </div>
        </div>
        
      </div>
    </Link>
  )
}

export default VideoCard
