import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, { name, email, password })
      console.log(response.data)

      // Save the token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

      navigate('/chat')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
        <div className='flex justify-center items-center m-5'>
          <form action="" className='flex flex-col justify-center items-center gap-4 p-4 bg-gray-950 rounded-2xl shadow-2xl h-100 w-100' onSubmit={handleSubmit}>
            <h1 className='text-2xl font-bold text-white'>Signup</h1>
            <input type="text" placeholder='Name' className='p-2 w-60 border border-[#30879c] rounded-md' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='Email' className='p-2 w-60 border border-[#30879c] rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' className='p-2 w-60 border border-[#30879c] rounded-md' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className='bg-[#30879c] text-white font-semibold cursor-pointer hover:bg-[#30879c]/80 rounded-md px-4 py-2' onClick={() => setLoading(true)}>{loading ? 'Loading...' : 'Signup'}</button>
            <p className='text-gray-600 text-sm '>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
          </form>
        </div>

        <div className='hidden md:flex justify-center items-center m-5'>
          <img src="/signupimage.png" alt="Signup Image" className='w-full h-full object-cover rounded-4xl' />
        </div>
      </div>
    </>
  )
}

export default Signup