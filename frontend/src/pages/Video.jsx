import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../features/videoSlice";

import VideoSection from "../components/VideoSection";
import CommentSection from "../components/CommentSection";
import RecommendedVideos from "../components/RecommendedVideos";

const Video = () => {
  // Get the value of the "id" parameter from the URL
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
  console.log(video);
  if (video)
    return (
      <div className="grid grid-cols-12 my-6 mx-24 gap-6">
        <div className="col-span-8">
        <VideoSection video={video} />
        <CommentSection />
        </div>
        <div className="col-span-4">
            <RecommendedVideos />
        </div>
      </div>
    );
  else return <div> Loading...</div>;
};

export default Video;
