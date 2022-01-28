import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF} from '@react-three/drei'

const Banana = ({ z }) => {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/banana-v1-transformed.glb')
    const { viewport, camera } = useThree()
    const { height, width } = viewport.getCurrentViewport(camera, [0,0,z])
    
    const [data] = useState({
      x: THREE.MathUtils.randFloatSpread(2),
      y: THREE.MathUtils.randFloatSpread(height),
      rX: Math.random() * Math.PI,
      rY: Math.random() * Math.PI,
      rZ: Math.random() * Math.PI,
    })
  
    useFrame((state) => {
      ref.current.rotation.set(data.rX += 0.001, data.rY += 0.0005, data.rZ += 0.00015)
      ref.current.position.set(data.x * width,(data.y += 0.005), z)
  
      if(data.y > height) {
        data.y = -height
      }
    })
  
    return (
        <mesh ref={ref} geometry={nodes.banana.geometry} material={materials.skin} rotation={[-Math.PI / 2, 0, 0]} material-emissive="orange"/>
    )
  
  }

  export default Banana