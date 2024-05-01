import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-4 w-screen-xl">
          <div className="flex gap-4 justify-center items-center">
            <button className="rounded-full hover:bg-gray-200 p-2">
              <IconContext.Provider value={{ size: "25px", color: "gray" }}>
                <GiHamburgerMenu />
              </IconContext.Provider>
            </button>
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="logo" className="h-20" />
            </Link>
          </div>
          <div className="w-1/2 flex gap-4">
            <div className="rounded-full bg-white flex items-center w-full">
              <input
                type="search"
                placeholder="Search..."
                className="py-2.5 px-4 rounded-l-full border border-gray-300  w-full focus:border-blue-400"
              />
              <button className=" bg-gray-200 py-[13px] px-6 rounded-r-full flex justify-center items-center">
                <IconContext.Provider value={{ size: "20px" }}>
                  <FaMagnifyingGlass />
                </IconContext.Provider>
              </button>
            </div>
            <button className="rounded-full p-4 bg-gray-100 hover:bg-gray-200">
              <IconContext.Provider value={{ size: "20px" }}>
                <FaMicrophone />
              </IconContext.Provider>
            </button>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button className="rounded-full p-4  hover:bg-gray-200">
              <IconContext.Provider value={{ size: "20px" }}>
                <HiDotsVertical />
              </IconContext.Provider>
            </button>
            <Link to="/login" className="flex gap-2 justify-center items-center py-1.5 px-3 rounded-full border-2 border-gray-100 hover:bg-blue-100">
              <IconContext.Provider value={{ size: "20px", color:'#4487de' }}>
              <CgProfile />
              </IconContext.Provider>
              <p className="text-blue-500 font-medium">Sign in</p>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
