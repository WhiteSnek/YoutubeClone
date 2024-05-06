import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../features/commentSlice";
import { BsEmojiGrin } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { postComment } from "../features/commentSlice";
import Comment from "./Comment";
const CommentSection = ({ videoId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(videoId));
  }, []);
  const { comment } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { error } = useSelector((state) => state.comment);
  const [userComment, setUserComment] = useState("");
  const [show, setShow] = useState(false);
  const addComment = (videoId,content) => {
    dispatch(postComment(videoId,content)).then((result) => {
      if(result.payload){
        setUserComment("")
      }})
  }
  return (
    <div>
      <div className="flex gap-8 items-start w-full mx-4 my-8">
        <img
          src={user.avatar}
          alt="avatar"
          className="h-8 w-8  rounded-full object-cover"
        />
        <div className="w-full">
          <input
            type="text"
            onFocus={() => setShow(true)}
            
            defaultValue={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-b-2 border-gray-400 w-full focus:border-b-2 outline-none focus:border-blue-400"
          />
          {show && (
            <div className="flex justify-between pt-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <IconContext.Provider value={{ size: "20px" }}>
                  <BsEmojiGrin />
                </IconContext.Provider>
              </button>
              {/* TODO: the browser is using too much ram while running this code */}
              <div className="flex gap-4 justify-center items-center">
                <button className="px-4 py-2 hover:bg-gray-200 rounded-full" onClick={() => setShow(false)}>Cancel</button>
                {userComment==="" ? <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full" disabled>Comment</button>:
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full" onClick={addComment(videoId,userComment)}>Comment</button>}
              </div>
            </div>
          )}
        </div>
      </div>
      {comment?.map((item, idx) => (
        <Comment comment={item} key={idx} />
      ))}
    </div>
  );
};

export default CommentSection;
