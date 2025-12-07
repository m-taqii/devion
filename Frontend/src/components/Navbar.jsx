import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full flex justify-between items-center p-4 text-white backdrop-blur-2xl bg-[#151922]/20'>
        <h1 className='font-[ScienceGothic]'> CodeRev</h1>
        <ul className='flex gap-4'>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/chat">Chat</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar