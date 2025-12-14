import React from 'react'
import { Float, PerformanceMonitor } from '@react-three/drei'
import DamagedHelmet from '../models/DamagedHelmet'
import { EffectComposer, ToneMapping, ChromaticAberration, Bloom } from "@react-three/postprocessing"
import { useHelper, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { useSelector } from 'react-redux'

const CanvasContent = () => {
  const { enableEffects, enableInteraction } = useSelector((state) => state.model)
  return (
    <>
      <AdaptiveDpr pixelated />
      {enableInteraction && <AdaptiveEvents />}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 10, 7.5]}
        intensity={1}
        castShadow
        shadow-mapSize={[512, 512]}
        color="#ffffff"
      />
      <rectAreaLight
        position={[0, 0, 5]}
        width={4}
        height={4}
        intensity={2}
        color="#4f46e5" /* Indigo hint */
      />

      <DamagedHelmet />
      <Float />
      {/* Rim light for better shape definition */}
      <spotLight position={[-5, 5, -5]} intensity={4} color="#00ffff" />
      <spotLight position={[5, -5, -5]} intensity={4} color="#ff00ff" />

      {enableEffects && <EffectComposer multisampling={0} disableNormalPass>
        <ToneMapping />
        <Bloom
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          intensity={0.5}
          mipmapBlur
        />
        <ChromaticAberration offset={[0.002, 0.002]} />
      </EffectComposer>}
    </>
  )
}

export default CanvasContent