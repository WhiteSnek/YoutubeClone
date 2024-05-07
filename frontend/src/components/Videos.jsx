import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideos } from '../features/videoSlice'
import VideoCard from './VideoCard'

const Videos = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideos())
    }, [])

    const { video } = useSelector(state => state.video)
    const videoFiles = video.videos
    const {error} = useSelector(state=>state.video)
    console.log(error)
    if (videoFiles) {
        return (
            <div className='grid grid-cols-12 gap-4 h-screen w-full'>
                {videoFiles.map((item, idx) => (
                    <VideoCard item={item} key={idx} />
                ))}
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default Videos
