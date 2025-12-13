import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='fixed top-0 left-0 w-full flex justify-between items-center p-4 text-white backdrop-blur-2xl bg-black/20 z-50'>
            <h1 className='font-[ScienceGothicLight]'>Devion</h1>
            <ul className='flex gap-4'>
                <li>
                    <Link to="/" className='font-semibold font-[ScienceGothicLight]'>Home</Link>
                </li>
                <li>
                    <Link to="/chat" className='font-semibold font-[ScienceGothicLight]'>Chat</Link>
                </li>
                <li>
                    <Link to="/login" className='bg-transparent border border-gray-200/10 text-gray-200 hover:text-white hover:border-gray-500 hover:bg-gray-500/10 font-semibold rounded-full px-4 py-2 font-[ScienceGothicLight]'>Login</Link>
                </li>
                <li>
                    <Link to="/signup" className='bg-[#30879c] text-white font-semibold hover:bg-[#30879c]/80 rounded-full px-4 py-2 font-[ScienceGothicLight]'>Signup</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar