import React, { useState } from "react";
import { registerUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from '../assets/logo.svg'
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const handleChange = (e, type) => {
    if (e.target.files[0]) {
      if (type === 'avatar') {
        setDetails({
          ...details,
          avatar: e.target.files[0],
          avatarUrl: URL.createObjectURL(e.target.files[0]),
        });
      } else if (type === 'coverImage') {
        setDetails({
          ...details,
          coverImage: e.target.files[0],
          coverImageUrl: URL.createObjectURL(e.target.files[0]),
        });
      }
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading,error} = useSelector((state)=>state.user)
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, username, email, password, avatar, coverImage } = details;
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);
    dispatch(registerUser(formData)).then((result) => {
      if (result.payload) {
        setDetails({
          fullname: "",
          username: "",
          email: "",
          password: "",
          avatar: null,
          avatarUrl: "",
          coverImage: null,
          coverImageUrl: "",
        });
        navigate("/");
      }
    });
  };
  const [details, setDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    avatarUrl: "",
    coverImage: null,
    coverImageUrl: "",
  });
  return (
    <div className=" bg-cyan-50 rounded-lg w-4/5 h-screen mx-auto my-5 shadow-lg grid grid-cols-12">
      <div className="col-span-6">
        <img src={Logo} alt='logo' className='h-1/2' />
        <p className='text-xl font-medium'>Login to youtube</p>
      </div>
      <div className="col-span-6 p-12 h-full flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold text-black pb-5">Sign up</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full name:</label>
          <input
            className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            id="fullname"
            type="text"
            placeholder="Enter fullname"
            defaultValue={details.fullname}
            onChange={(e) =>
              setDetails({ ...details, fullname: e.target.value })
            }
          />
          <label htmlFor="username">User name:</label>
          <input
            className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            id="username"
            type="text"
            placeholder="Enter username"
            defaultValue={details.username}
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
          <label htmlFor="email">Email Id:</label>
          <input
            className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            id="email"
            type="email"
            placeholder="Enter email"
            defaultValue={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <div className="relative">
            <input
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-500"
              id="password"
              type="password"  //{show ? "text" : "password"}
              placeholder="Enter Password"
              defaultValue={details.password}
              onChange={(e) => setDetails({ ...details, password: e.target.value })}
            />
            {/* <button
              type="button"
              className="absolute top-0 right-0 p-2"
              onClick={togglePasswordVisibility}
            >
              {show ? (
                <IconContext.Provider value={{ size: "27px" }}>
                  <BiSolidHide />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "27px" }}>
                  <BiSolidShow />
                </IconContext.Provider>
              )}
            </button> */}
          </div>
          <label htmlFor="avatar">Avatar:</label>
          <input
            className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            id="avatar"
            type="file"
            placeholder="Enter your avatar"
            onChange={(e) => handleChange(e, 'avatar')}
          />
          {details.avatarUrl && (
            <img
              src={details.avatarUrl}
              alt="Avatar Preview"
              className="w-20 h-20"
            />
          )}
          <label htmlFor="cover-image">Cover Image:</label>
          <input
            className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            id="cover-image"
            type="file"
            placeholder="Enter your cover image"
            onChange={(e) => handleChange(e,'coverImage')}
          />
          {details.coverImageUrl && (
            <img
              src={details.coverImageUrl}
              alt="Avatar Preview"
              className="w-20 h-20"
            />
          )}
          <div className="flex justify-between items-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
            >
              Register
            </button>
          </div>
          <Link to="/login" className="text-blue-600 hover:text-blue-400">
            Already have an account? Sign in
          </Link>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
