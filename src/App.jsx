import { Suspense } from 'react'
import { Canvas} from "@react-three/fiber"
import { Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import  Banana  from './Banana'

const App = ({count = 250, depth = 80}) => {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.1, far: 110, fov: 30 }}>
      <color attach="background" args={["#FFBF40"]} />
      <spotLight position={[10,10,10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset='sunset' />
       {Array.from({length: count}, (_, i) => (<Banana key={i} z={(-i / count) * depth - 20} />))}
       <EffectComposer>
         <DepthOfField target={[0,0, depth / 2]} focalLength={2.5} bokehScale={8} height={700} />
       </EffectComposer>
      </Suspense>
    </Canvas> 
  )
}

export default App
