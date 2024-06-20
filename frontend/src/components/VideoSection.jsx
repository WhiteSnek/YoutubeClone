import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import { CiBellOn } from "react-icons/ci";
import { MdPlaylistAdd } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import VideoPlayer from "./VideoPlayer";
import VideoLike from "./VideoLike";
import { useDispatch, useSelector } from "react-redux";
import { addVideoToPlaylist, createPlaylist, removeVideoFromPlaylist } from "../features/playlistSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const VideoSection = ({ video }) => {
  const playerRef = React.useRef(null);
  const dispatch = useDispatch();
  // const [playlistId,setPlaylistId] = useState('')
  const { playlist } = useSelector((state) => state.playlist);
  // console.log(playlistId)
  const [save, setSave] = useState(false);
  const [add,setAdd] = useState(false)
  const [details,setDetails] = useState({title:'',description: ''})
  console.log(add)
  useEffect(() => {
    const foundVideo = findVideoInPlaylist();
    if (foundVideo) {
      setSave(false);
    } else {
      setSave(true);
    }
  }, []);
  const findVideoInPlaylist = () => {
    return playlist.find((item) => item._id === video._id);
  };
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: video.videoFile,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const addVideo = (videoId, playlistId) => {
    console.log("playlist id in add video: ", playlistId);
    dispatch(addVideoToPlaylist({ videoId, playlistId }));
  };
  const removeVideo = (videoId, playlistId) => {
    console.log("playlist id in remove video: ", playlistId);
    dispatch(removeVideoFromPlaylist({ videoId, playlistId }));
  };

  const addPlaylist = () => {
    dispatch(createPlaylist(details))
  }

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

        <Popup
          contentStyle={{ width: "20%", borderRadius: "10px" }}
          trigger={
            <button className="rounded-full bg-gray-100 px-4 py-2 flex items-center gap-3 hover:bg-gray-200">
              <IconContext.Provider value={{ size: "25px" }}>
                <MdPlaylistAdd />
              </IconContext.Provider>
              {save ? "Saved" : "Save"}
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="px-4 py-2">
              <div className="flex justify-between pb-4"><p>Save video to</p> <button onClick={()=>close()}><RxCross1 /></button></div>
              
              <div>
                {playlist.map((item, idx) => (
                  <p>
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={(e) => {
                        if (save) {
                          // Call removeVideo if save is true
                          removeVideo(video._id, item._id);
                        } else {
                          // Call addVideo if save is false
                          addVideo(video._id, item._id);
                        }
                        // Toggle the save state
                        setSave((prevSave) => !prevSave);
                      }}
                      checked={save}
                    />{" "}
                    {item.name}
                  </p>
                ))}
                <button className="flex gap-3 items-center" onClick={() => setAdd(!add)}>
                <IconContext.Provider value={{ size: "20px" }}>
                <FaPlus />
              </IconContext.Provider>
              <p>Create new playlist</p>
                </button>
                {add && <div className="my-5">
                  <input type="text" placeholder="Add title" onChange={(e)=>setDetails({...details,title:e.target.value})} className="w-full outline-none border-b-2 border-gray-600 m-2" />
                  <input type="text" placeholder="Add description" onChange={(e)=>setDetails({...details,description:e.target.value})} className="w-full outline-none border-b-2 border-gray-600 m-2" />
                  <button className="hover:bg-blue-200 float-right text-blue-400 px-4 py-2 rounded-full" onClick={addPlaylist}>Create</button>
                  </div>}
              </div>
            </div>
          )}
        </Popup>
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
