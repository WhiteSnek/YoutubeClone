import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/userSlice'

const Login = () => {
  const [details,setDetails] = useState({
    email: '',
    password: ''
  })
  const {loading,error} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(details)).then((result) => {
      if(result.payload){
        setDetails({email: '',password: ''})
        navigate('/')
      }
    })
    
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-gray-50 rounded-lg w-4/5 h-[80vh] mx-auto my-5 shadow-lg grid grid-cols-12'>
        <div className='col-span-6 p-12 h-full flex flex-col justify-center items-center'>
        <img src={Logo} alt='logo' className='h-1/2' />
        <p className='text-xl font-medium'>Login to youtube</p>
        </div>
        <div className='col-span-6 flex-col my-auto px-10 justify-center items-center'>
        <h3 className="text-5xl font-bold text-gray-800 pb-5 text-center">
          Sign in
        </h3>
          <form className='space-y-4 p' onSubmit={handleSubmit}>
            <label htmlFor='Email'>Email: </label>
            <input type='email' id='Email' value={details.email} onChange={(e) => setDetails({...details, email: e.target.value})} className='border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-500' />
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' value={details.password} onChange={(e) => setDetails({...details, password: e.target.value})} className='border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-500' /> 
            <div className="flex justify-between items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-400">
              Forgot password?
            </Link>
            <button
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <Link to="/register" className="text-blue-600 hover:text-blue-400">
            Don't have an account? Sign up
          </Link>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login
