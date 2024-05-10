import React, { useState } from "react";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import { toggleCommentLike } from "../features/likeSlice";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [liked,setLiked] = useState(comment.isLiked)
  const [likeCount,setLikeCount] = useState(comment.likesCount)
  const toggleLike = () => {
    dispatch(toggleCommentLike(comment._id))
    if(liked) setLikeCount(likeCount-1);
    else setLikeCount(likeCount+1)
    setLiked(liked => !liked)
    
  }
  return (
    <div className="grid grid-cols-12 mt-10 gap-4 ">
      <div className="col-span-1 flex justify-center items-start">
        <Link to={`/${comment.owner[0].username}`}><img
          src={comment.owner[0].avatar}
          alt="avatar"
          className="h-8 w-8  rounded-full object-cover"
        />
        </Link>
      </div>
      <div className="col-span-11">
        <div className="flex gap-2 items-center text-sm">
          <p className="font-semibold">@{comment.owner[0].username}</p>
          <span className="font-normal text-gray-500">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>
        <h2>{comment.content}</h2>
        <div className="flex gap-2 items-center mt-2">
        <button className=" p-2 rounded-full hover:bg-gray-200 " onClick={toggleLike}>
          {liked ? (
            <IconContext.Provider value={{ size: "25px"}}>
              <AiFillLike />
            </IconContext.Provider>
          ) : (
            
            <IconContext.Provider value={{ size: "25px"}}>
              <AiOutlineLike />
            </IconContext.Provider>
          )}
          
        </button>
        <p className="text-gray-500">{likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
