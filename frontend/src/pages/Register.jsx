import React, { useState } from 'react'

const Register = () => {
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setDetails({
        ...details,
        avatar: e.target.files[0],
        avatarUrl: URL.createObjectURL(e.target.files[0]), 
      });
    }
  };

  const [details, setDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    avatarUrl: "",
    coverImage: null,
    coverImageUrl: ""
  });
  return (
    <div className=" bg-cyan-50 rounded-lg w-4/5 h-screen mx-auto my-5 shadow-lg grid grid-cols-12">
      <div className="col-span-6">
        <img src={BGImage} alt="bg-image" className="h-full" />
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
          onChange={(e) => setDetails({ ...details, fullname: e.target.value })}
        />
        <label htmlFor="username">User name:</label>
        <input
          className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          id="username"
          type="text"
          placeholder="Enter username"
          defaultValue={details.username}
          onChange={(e) => setDetails({ ...details, username: e.target.value })}
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
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              defaultValue={details.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="absolute top-0 right-0 p-2" onClick={togglePasswordVisibility}>
              {show ?  <IconContext.Provider value={{  size: "27px" }}>
                <BiSolidHide />
              </IconContext.Provider> : <IconContext.Provider value={{  size: "27px" }}>
                <BiSolidShow />
              </IconContext.Provider>}
            </button>
          </div>
        <label htmlFor="avatar">Avatar:</label>
        <input
          className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          id="avatar"
          type="file"
          placeholder="Enter your avatar"
          onChange={handleChange}
        />
        {details.avatarUrl && (
          <img src={details.avatarUrl} alt="Avatar Preview" className="w-20 h-20" />
        )}
        <label htmlFor="cover-image">Cover Image:</label>
        <input
          className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          id="cover-image"
          type="file"
          placeholder="Enter your cover image"
          onChange={handleChange}
        />
        {details.coverImageUrl && (
          <img src={details.coverImageUrl} alt="Avatar Preview" className="w-20 h-20" />
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
  )
}

export default Register
