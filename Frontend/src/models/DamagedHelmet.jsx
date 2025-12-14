import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const DamagedHelmet = ({ismobile}) => {
    const ref = useRef()
    useFrame(({ mouse }) => {
        if (!ismobile) {
            ref.current.rotation.y = mouse.x * Math.PI / 14
            ref.current.rotation.x = -(mouse.y * Math.PI / 14)
        }
    })
    const scale = ismobile ? 0.2 : 1
    const { scene } = useGLTF('/models/DamagedHelmet.gltf')
    return <primitive object={scene} scale={scale} ref={ref} />
}

useGLTF.preload('/models/DamagedHelmet.gltf')

export default DamagedHelmet