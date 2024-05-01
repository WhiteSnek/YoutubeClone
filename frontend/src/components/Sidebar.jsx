import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import { MdSubscriptions } from "react-icons/md";   

const Sidebar = () => {
  return (
    <div className="col-span-2">
      <div className="w-full ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-300" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-300  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px"}}>
            <GoHome />
          </IconContext.Provider>
          Home
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-300" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-300  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px" }}>
          <MdSubscriptions />
          </IconContext.Provider>
          Subscriptions
        </NavLink>
        
        <div class="line bg-gray-200 mx-auto w-11/12 h-px"></div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-300" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-300  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px", color: "gray" }}>
            <GoHome />
          </IconContext.Provider>
          Home
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-3 py-2 m-2 rounded-xl duration-200 ${
              isActive ? "bg-gray-300" : "bg-white"
            } border-b border-gray-100 hover:bg-gray-300  flex gap-4`
          }
        >
          <IconContext.Provider value={{ size: "25px", color: "gray" }}>
            <GoHome />
          </IconContext.Provider>
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
