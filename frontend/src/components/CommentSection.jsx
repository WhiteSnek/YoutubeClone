import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../features/commentSlice";
import Comment from "./Comment";
const CommentSection = ({ videoId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(videoId));
  }, []);
  const { comment } = useSelector((state) => state.comment);
  const { error } = useSelector((state) => state.comment);
  console.log(comment);
  return (
    <div>
      {comment?.map((item, idx) => (
        <Comment comment={item} key={idx} />
      ))}
    </div>
  );
};

export default CommentSection;
