import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist, getUserPlaylists } from "../features/playlistSlice";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";

const PlayListCard = ({ item }) => {
    const [dropdown,setDropdown] = useState(false)
    const toggleDropdown = () => setDropdown(!dropdown)
    const dispatch = useDispatch()
    const delPlaylist = () => {
        dispatch(deletePlaylist(item._id))
    }
  return (
    <div className="col-span-4">
      <div className="col-span-5 mx-auto relative group">
        <img
          src={item.videos[0]?.thumbnail}
          alt="cover photo"
          className="aspect-video rounded-md mx-auto w-full"
        />
        <Link to={`/playlist/${item._id}`}>
          <div className="absolute h-full w-full top-0  justify-center text-white items-center rounded-md group-hover:flex hidden bg-gray-900 opacity-50">
            Play All
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-2">
      <div className="flex justify-between items-center relative">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <button className="rounded-full p-2  hover:bg-gray-200" onClick={toggleDropdown}>
            <IconContext.Provider value={{ size: "20px" }}>
              <HiDotsVertical />
            </IconContext.Provider>
          </button>
        <button className={`${dropdown ? "flex" : "hidden"} absolute top-8 right-0 rounded-md justify-between items-center p-2 bg-gray-200`} onClick={delPlaylist}>
        <IconContext.Provider value={{ size: "20px" }}>
            <MdOutlineDelete />
            </IconContext.Provider>
            <p>Delete playlist</p>
        </button>
        </div>
          <Link
            to={`/${item.owner[0].username}`}
            className="text-sm font-medium text-gray-500 hover:text-black hover:font-semibold"
          >
            {item.owner[0].fullname}
          </Link>
          
        <Link
          to={`/playlist/${item._id}`}
          className="text-sm font-semibold text-gray-500 hover:text-black"
        >
          View full playlist
        </Link>
      </div>
    </div>
  );
};

const PlayLists = () => {
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    dispatch(getUserPlaylists(user._id)).then((result) => {
      if (result.payload) setPlaylist(result.payload);
    });
  }, []);
  console.log(playlist);
  return (
    <div className="grid grid-cols-12 gap-20">
      <div className="col-span-3">
        <Sidebar />
      </div>

      <div className="col-span-7">
        <h1 className="font-bold text-3xl p-4">Playlists</h1>
        <div className="grid grid-cols-12">
          {playlist.map((item, idx) => (
            <PlayListCard item={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayLists;
