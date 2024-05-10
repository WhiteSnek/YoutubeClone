import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../features/videoSlice";

import VideoSection from "../components/VideoSection";
import CommentSection from "../components/CommentSection";
import RecommendedVideos from "../components/RecommendedVideos";
import Sidebar from "../components/Sidebar";

const Video = () => {
  const show = useSelector((state) => state.show);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [video, setVideo] = useState("");
  useEffect(() => {
    dispatch(getVideoById(id)).then((result) => {
      if (result.payload) {
        setVideo(result.payload[0]);
      }
    });
  }, []);
  console.log(video._id);
  if (video)
    return (
      <>
      {show && <div className="fixed left-0 z-10 bg-white w-1/6"><Sidebar /></div>}
      <div className={`${show?" opacity-40":""}`}>
        <div className={`grid grid-cols-12 py-6 px-24 gap-6 `}>
          <div className="col-span-8">
            <VideoSection video={video} />
            <CommentSection videoId={video._id} />
          </div>
          <div className="col-span-4">
            <RecommendedVideos />
          </div>
        </div>
        </div>
      </>
    );
  else return <div> Loading...</div>;
};

export default Video;
