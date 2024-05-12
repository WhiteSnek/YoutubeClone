import React from "react";
import { NavLink, Link } from "react-router-dom";

// react icon imports
import { IconContext } from "react-icons/lib";
import { GoHome } from "react-icons/go";
import { MdSubscriptions } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { MdPlaylistPlay } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
// redux imports
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="col-span-2 h-screen">
      <div className="w-full ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-100" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px" }}>
            <GoHome />
          </IconContext.Provider>
          Home
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-300" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px" }}>
            <MdSubscriptions />
          </IconContext.Provider>
          Subscriptions
        </NavLink>

        <div className="line bg-gray-200 mx-auto w-11/12 h-px"></div>

        <NavLink
          to={`/${user.username}`}
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-300" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px" }}>
            <BiSolidUserAccount />
          </IconContext.Provider>
          You
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-300" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px" }}>
            <LuHistory />
          </IconContext.Provider>
          History
        </NavLink>
        {!user ? (
          <>
            <div className="line bg-gray-200 mx-auto w-11/12 h-px"></div>
            <div className="py-4 px-6 flex flex-col justify-center items-center gap-3">
              <p>Sign in to like videos, comment and subscribe</p>
              <Link
                to="/login"
                className="flex gap-2 w-1/2 justify-center items-center py-1.5 px-3 rounded-full border-2 border-gray-100 hover:bg-blue-100"
              >
                <IconContext.Provider
                  value={{ size: "20px", color: "#4487de" }}
                >
                  <CgProfile />
                </IconContext.Provider>
                <p className="text-blue-500 font-medium">Sign in</p>
              </Link>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/playlist"
              className={({ isActive }) =>
                `block px-3 py-2 m-2 rounded-xl duration-200 ${
                  isActive ? "bg-gray-300" : "bg-white"
                } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
              }
            >
              <IconContext.Provider value={{ size: "25px" }}>
                <MdPlaylistPlay />
              </IconContext.Provider>
              PlayLists
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `block px-3 py-2 m-2 rounded-xl duration-200 ${
                  isActive ? "bg-gray-300" : "bg-white"
                } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
              }
            >
              <IconContext.Provider value={{ size: "25px" }}>
                <GoVideo />
              </IconContext.Provider>
              Your Videos
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `block px-3 py-2 m-2 rounded-xl duration-200 ${
                  isActive ? "bg-gray-300" : "bg-white"
                } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
              }
            >
              <IconContext.Provider value={{ size: "25px" }}>
                <MdOutlineWatchLater />
              </IconContext.Provider>
              Watch Later
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `block px-3 py-2 m-2 rounded-xl duration-200 ${
                  isActive ? "bg-gray-300" : "bg-white"
                } border-b border-gray-100 hover:bg-gray-100  flex gap-4`
              }
            >
              <IconContext.Provider value={{ size: "25px" }}>
                <AiOutlineLike />
              </IconContext.Provider>
              Liked Videos
            </NavLink>
          </>
        )}
        <div className="line bg-gray-200 mx-auto w-11/12 h-px"></div>
      </div>
    </div>
  );
};

export default Sidebar;
