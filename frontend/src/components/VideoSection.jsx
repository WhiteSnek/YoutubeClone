import React from "react";
import { IconContext } from "react-icons/lib";
import { CiBellOn } from "react-icons/ci";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import VideoPlayer from "./VideoPlayer";
import VideoLike from "./VideoLike";
const VideoSection = ({ video }) => {
    const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: video.videoFile,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <div>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <h1 className="text-3xl mt-5 font-bold">{video.title}</h1>
      <div className="flex gap-5 py-5 items-center">
        <img
          src={video.owner[0].avatar}
          className="h-10 w-10 rounded-full object-cover"
        />
        <h1 className=" font-semibold">{video.owner[0].fullname}</h1>
        <button className="rounded-full bg-gray-100 px-4 py-2 flex items-center gap-3">
          <IconContext.Provider value={{ size: "25px" }}>
            <CiBellOn />
          </IconContext.Provider>
          Subscribe
        </button>
        <VideoLike video={video} />
      </div>
      <div className="my-2 bg-gray-100 p-4 rounded-lg">
        <div className="flex gap-4 font-semibold">
          <p>{video.views} views</p>
          <p>{formatRelativeTime(video.createdAt)}</p>
        </div>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoSection;
