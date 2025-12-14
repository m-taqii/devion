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

const Home = () => {
  const cards = [
    { title: 'Expert Debugging', desc: 'Pinpoint bugs and provide fixes with explanations.' },
    { title: 'Code Reviews', desc: 'Best-practice suggestions, refactors, and tests.' },
    { title: 'Architecture', desc: 'Scalable system designs and API schemas.' },
  ]

  const items = ['Code Review', 'Debugging', 'Refactoring', 'Career Guidance']
  const [ismobile, setIsmobile] = useState(false)

  useEffect(() => {
    if(window.innerWidth < 768 ){
      setIsmobile(true)
    }
  }, [])
  

useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger)
 
})
  return (
    <div className='min-h-screen w-full bg-black'>
      <Navbar />

      {/* Hero Section */}
  
        <div className='fixed inset-0 z-0 pointer-events-none w-full h-full bg-black'>

          {/* Background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-[80px]"></div>

          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20"></div>
          <img
            src="/devion.png"
            alt="Devion Logo"
            className='absolute w-170 z-51 top-70 md:top-55 left-1/2 transform -translate-x-1/2 mix-blend-difference'
            fetchPriority="high"
            loading="eager"
          />
          {/* Canvas for 3D scene */}
          <CanvasExperience ismobile={ismobile}/>
        </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home