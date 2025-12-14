import React, { Suspense, useRef } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useState } from 'react'
import CanvasContent from '../components/CanvasContent'


const Home = () => {
  const cards = [
    { title: 'Expert Debugging', desc: 'Pinpoint bugs and provide fixes with explanations.' },
    { title: 'Code Reviews', desc: 'Best-practice suggestions, refactors, and tests.' },
    { title: 'Architecture', desc: 'Scalable system designs and API schemas.' },
  ]

  const items = ['Code Review', 'Debugging', 'Refactoring', 'Career Guidance']
  const [dpr, setDpr] = useState(1.5) // Default pixel ratio
  const [enableEffects, setEnableEffects] = useState(true)
  return (
    <div className='min-h-screen w-full bg-black'>
      <Navbar />

      {/* Hero Section */}
      <section className='h-screen w-full flex flex-col justify-center items-center relative overflow-hidden'>
        <div className='absolute inset-0 w-full h-full bg-black z-0'>

          {/* Background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-[80px]"></div>

          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20"></div>
          <img
            src="/devion.png"
            alt="Devion Logo"
            className='absolute w-170 z-51 top-55 left-1/2 transform -translate-x-1/2 mix-blend-difference'
            fetchPriority="high"
            loading="eager"
          />
          {/* Canvas for 3D scene */}
          <Canvas shadows dpr={dpr} gl={{ antialias: false }} camera={{ position: [0, 0, 4], fov: 45 }}>
            <PerformanceMonitor
              onIncline={() => setDpr(2)}
              onDecline={() => {
                setDpr(1);         // Lower resolution
                setEnableEffects(false); // KILL post-processing on slow phones
              }}
            />
            <Suspense fallback={null}>
              <CanvasContent enableEffects={enableEffects} />
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* Why Section */}
      <section className='w-full bg-black py-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <h3 className="text-2xl md:text-4xl font-semibold font-[ScienceGothic] text-center">
            Why Our AI Developer
          </h3>
          <p className="text-slate-400 text-sm md:text-lg mt-4 text-center max-w-2xl mx-auto font-[ScienceGothicLight]">
            It behaves like an experienced engineer — not a generic assistant. Get concrete code changes, design diagrams, and career mentorship.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-xl border border-slate-900 bg-gray-950 hover:border-[#00ccff]/50 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-gray-900 flex items-center justify-center">
                  <span className="text-[#00ccff] text-xl">&#9881;</span>
                </div>
                <h4 className="mt-4 text-lg font-semibold font-[ScienceGothic]">{c.title}</h4>
                <p className="mt-2 text-sm text-slate-400 font-[ScienceGothicLight]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="w-full bg-black py-20 px-6">
        <div className='max-w-6xl mx-auto'>
          <h3 className="text-2xl md:text-4xl font-semibold font-[ScienceGothic] text-center">
            What It Can Do
          </h3>
          <p className="text-slate-400 mt-4 text-sm md:text-lg text-center font-[ScienceGothicLight]">
            Capabilities focused on what developers, teams, and learners need every day.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((it) => (
              <div
                key={it}
                className="rounded-xl border p-6 text-center border-slate-900 bg-gray-950 hover:border-[#00ccff]/50 transition-all duration-300"
              >
                <div className="h-12 w-12 mx-auto rounded-lg bg-gray-900 flex items-center justify-center">
                  <span className="text-[#00ccff] text-xl">&#9881;</span>
                </div>
                <p className="mt-4 font-medium font-[ScienceGothic]">{it}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home