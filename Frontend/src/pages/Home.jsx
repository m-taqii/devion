import React, { Suspense, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import CanvasContent from '../components/CanvasContent'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";
import CanvasExperience from '../components/CanvasExperience'

import RotatingBadge from '../components/RotatingBadge'

const Home = () => {
  const [ismobile, setIsmobile] = useState(false)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsmobile(true)
    }
  }, [])


  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

  })
  return (
    <div className='min-h-screen w-full bg-black'>
      <div className="relative z-50 pointer-events-auto">
        <Navbar />
      </div>


      <div className='fixed inset-0 z-0 w-full h-full bg-black'>

        {/* Background Effect*/}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-[80px]"></div>

        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20"></div>
        {/* Canvas for 3D scene */}
        <CanvasExperience ismobile={ismobile} />
      </div>

      {/* Hero Section */}
      <section className='relative z-10 pointer-events-none h-screen w-full flex flex-col items-center justify-center '>
        <img
          src="/devion.png"
          alt="Devion Logo"
          className='pointer-events-auto w-170 mix-blend-difference mt-20'
          fetchPriority="high"
          loading="eager"
        />

        <div className="pointer-events-auto text-left w-50 md:w-110 max-w-2xl relative md:top-25 md:right-112 top-42 right-18">
          <p className="text-blue-200/80 text-xs/2 flex flex-col md:inline-block gap-2 md:text-sm font-light tracking-wide font-[ScienceGothicLight]">
            INTELLIGENCE REDEFINED FOR THE <span className="text-blue-500 font-semibold font-[ScienceGothic]">MODERN DEVELOPER</span>
          </p>
        </div>
      </section>

      <RotatingBadge />
    </div>
  )
}
export default Home