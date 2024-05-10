import React, {useState} from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import { toggleVideoLike } from "../features/likeSlice";


const VideoLike = ({video}) => {
    const dispatch = useDispatch();
  const [liked,setLiked] = useState(video.isLiked)
  const [likeCount,setLikeCount] = useState(video.likesCount)
  const toggleLike = () => {
    dispatch(toggleVideoLike(video._id))
    if(liked) setLikeCount(likeCount-1);
    else setLikeCount(likeCount+1)
    setLiked(liked => !liked)
    
  }
  return (
    <div className="flex gap-2 items-center">
        <button className=" py-2 rounded-full bg-gray-100 px-4 hover:bg-gray-200 flex gap-2 justify-center items-center " onClick={toggleLike}>
          {liked ? (
            <IconContext.Provider value={{ size: "25px"}}>
              <AiFillLike />
            </IconContext.Provider>
          ) : (
            
            <IconContext.Provider value={{ size: "25px"}}>
              <AiOutlineLike />
            </IconContext.Provider>
          )}
          <p className="text-gray-500">{likeCount}</p>
        </button>
        
        </div>
  )
}

export default VideoLike
