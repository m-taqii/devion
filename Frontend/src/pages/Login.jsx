import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, { email, password })
      console.log(response.data)

      // Save the token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

      navigate('/chat')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
        <div className='flex justify-center items-center m-5 '>
          <form action="" className='flex flex-col justify-center items-center gap-4 p-4 bg-gray-950 rounded-2xl shadow-2xl h-80  w-80' onSubmit={handleSubmit}>
            <h1 className='text-2xl font-bold text-white'>Login</h1>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='p-2 border border-[#30879c] rounded-md' value={email} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 border border-[#30879c] rounded-md' />
            <button type="submit" className='bg-[#30879c] text-white font-semibold cursor-pointer hover:bg-[#30879c]/80 rounded-md px-4 py-2'>Login</button>
            <p className='text-gray-600 text-sm '>Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/signup')}>Signup</span></p>

          </form>
        </div>

        <div className='hidden md:flex justify-center items-center m-5'>
          <img src="/loginimage.png" alt="Login Image" className='w-full h-full object-cover rounded-4xl' />
        </div>
      </div>
    </>
  )
}

export default Login