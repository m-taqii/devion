import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import CanvasContent from './CanvasContent'
import { PerformanceMonitor } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const CanvasExperience = ({ismobile}) => {
  const { dpr, enableEffects, enableInteraction } = useSelector((state) => state.model)
  const dispatch = useDispatch()
  return (

        <Canvas shadows dpr={dpr} gl={{ antialias: false }} camera={{ position: [0, 0, ismobile ? 10 : 4], fov: ismobile ? 25 : 45 }} >
            <PerformanceMonitor
              onIncline={() => dispatch(setDpr(2))}
              onDecline={() => {
                dispatch(setDpr(1));         // Lower resolution
                dispatch(setEnableEffects(false)); // KILL post-processing on slow phones
              }}
            />
            <Suspense fallback={null}>
              <CanvasContent ismobile={ismobile} />
            </Suspense>
          </Canvas>
  )
}

export default CanvasExperience