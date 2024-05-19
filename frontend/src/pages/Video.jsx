import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../features/videoSlice";

import VideoSection from "../components/VideoSection";
import CommentSection from "../components/CommentSection";
import RecommendedVideos from "../components/RecommendedVideos";
import Sidebar from "../components/Sidebar";
import { addVideoToHistory } from "../features/userSlice";

const Video = () => {
  const show = useSelector((state) => state.show);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [video, setVideo] = useState("");
  console.log(id)
  useEffect(() => {
    dispatch(getVideoById(id)).then((result) => {
      if (result.payload) {
        setVideo(result.payload[0]);
        dispatch(addVideoToHistory(id))
      }
    });
  }, []);
  console.log(video._id);
  if (video)
    return (
      <div className='grid grid-cols-12'>
        {/* TODO: Set the side bar position to fixed */}
      {show && <div className="col-span-2 bg-white "><Sidebar /></div>}
      <div className={`flex gap-10 p-10 ${show?"col-span-10":"col-span-12"}`}>
        <div className={`grid grid-cols-12 py-6 gap-2 `}>
          <div className="col-span-8">
            <VideoSection video={video} />
            <CommentSection videoId={video._id} />
          </div>
          <div className="col-span-3">
            <RecommendedVideos />
          </div>
        </div>
        </div>
      </div>
    );
  else return <div> Loading...</div>;
};

export default Video;
