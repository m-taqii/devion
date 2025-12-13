import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
const DamagedHelmet = () => {
    const ref = useRef()
    useFrame(({ mouse }) => {
        ref.current.rotation.y = mouse.x * Math.PI/14
        ref.current.rotation.x = mouse.y * Math.PI/14
    })
    const { scene } = useGLTF('/models/DamagedHelmet.gltf')
    return <primitive object={scene} scale={1} ref={ref} />
}

export default DamagedHelmet