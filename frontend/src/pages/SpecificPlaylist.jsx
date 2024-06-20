import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPlaylist, getPlayListById } from "../features/playlistSlice";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { getExactTime } from "../utils/getExactTime";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import { GoPencil } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { RxCross1 } from "react-icons/rx";

const PlaylistCard = ({ item }) => {
  return (
    <Link
      to={`/videos/${item._id}`}
      className="flex gap-4 rounded-lg hover:bg-gray-200 p-4"
    >
      <img
        src={item.thumbnail}
        className="aspect-video w-1/4 object-fit rounded-md"
      />
      <div className="flex flex-col gap-4 ">
        <h1 className="font-bold text-xl">{item.title}</h1>

        <div className="flex text-gray-500 gap-4">
          <p>{item.owner[0].fullname}</p>
          <p>{item.views} views</p>
          <p>{formatRelativeTime(item.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
};

const SpecificPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [descEditMode, setDescEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const show = useSelector((state) => state.show);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayListById(playlistId)).then((result) => {
      if (result.payload) {
        setPlaylist(result.payload[0]);
        setTitle(result.payload[0].name);
        setDesc(result.payload[0].description);
      }
    });
  }, [dispatch, playlistId]);

  const updatePlaylist = () => {
    dispatch(
      editPlaylist({
        name: title,
        description: desc,
        playlistId: playlistId,
      })
    ).then( (result) => {
      if(result.payload){
        setTitle(result.payload.name)
        setDesc(result.payload.description)
      }
    }
    )
  };

  const toggleTitleEditMode = () => {
    setTitleEditMode(!titleEditMode);
  };

  const toggleDescEditMode = () => {
    setDescEditMode(!descEditMode);
  };

  const handleTitleChange = useCallback((e)=>{
    setTitle(e.target.value)
    
  },[])

  const handleDescChange = useCallback((e)=>{
    setDesc(e.target.value)
    
  },[])

  if (!playlist) {
    return <div>Loading....</div>;
  } else {
    return (
      <div className="grid grid-cols-12">
        {show && (
          <div className="col-span-2 bg-white">
            <Sidebar />
          </div>
        )}
        <div
          className={`grid grid-cols-12 gap-10 p-10 ${
            show ? "col-span-10" : "col-span-12"
          }`}
        >
          <div
            className={`fixed ${
              show ? "left-80" : "left-10"
            } h-screen w-1/4 col-span-4 p-8 bg-red-400 rounded-md`}
          >
            <div className="col-span-5 h-4/12 mx-auto relative group">
              <img
                src={playlist.videos[0].thumbnail}
                alt="cover photo"
                className="aspect-video w-full object-fit rounded-md mx-auto"
              />
              <Link to={`/playlist/${playlist?._id}`}>
                <div className="absolute h-full w-full top-0  justify-center text-white items-center rounded-md transition-all delay-100 group-hover:flex hidden bg-gray-900 opacity-50">
                  Play All
                </div>
              </Link>
            </div>
            <div className="text-white p-2">
              <div className="flex justify-between items-center">
                {!titleEditMode ? (
                  <h1 className="font-bold text-3xl pb-4 ">{playlist.name}</h1>
                ) : (
                  <input
                    type="text"
                    className="text-lg min-w-max bg-transparent outline-none border-b-2 border-white"
                    value={title}
                    onChange={handleTitleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        toggleTitleEditMode();
                        updatePlaylist();
                      }
                    }}
                  />
                )}
                <button
                  title="edit playlist"
                  className="hover:bg-red-300 p-2 rounded-full"
                  onClick={toggleTitleEditMode}
                >
                  <IconContext.Provider value={{ size: "20px" }}>
                    <GoPencil />
                  </IconContext.Provider>
                </button>
              </div>

              <p className="font-semibold text-sm">
                {playlist.owner[0].fullname}
              </p>
              <div className="text-xs flex gap-2 py-2 text-gray-200 font-semibold">
                <p>{playlist.videos.length} videos</p>
                <p>Last updated on {getExactTime(playlist.updatedAt)}</p>
              </div>
              <div className="flex justify-between items-center">
                {!descEditMode ? (
                  <p>{playlist.description}</p>
                ) : (
                  <input
                    type="text"
                    className="text-lg min-w-max bg-transparent outline-none border-b-2 border-white"
                    value={desc}
                    onChange={handleDescChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        toggleDescEditMode();
                        updatePlaylist();
                      }
                    }}
                  />
                )}
                <button
                  title="edit playlist"
                  className="hover:bg-red-300 p-2 rounded-full"
                  onClick={toggleDescEditMode}
                >
                  <IconContext.Provider value={{ size: "20px" }}>
                    <GoPencil />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`absolute ${show ? "left-1/2" : "left-1/3"} col-span-8`}
          >
            {playlist.videos.map((item, idx) => (
              <PlaylistCard item={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default SpecificPlaylist;
