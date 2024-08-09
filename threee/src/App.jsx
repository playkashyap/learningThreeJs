/* eslint-disable react/no-unknown-property */
import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { useControls } from 'leva'


function Env() {


  const { height, radius, scale } = useControls('Ground', {
    height: { value: 10, min: 0, max: 100, step: 1 },
    radius: { value: 115, min: 0, max: 1000, step: 1 },
    scale: { value: 15, min: 0, max: 1000, step: 1 },
  })


  return (
    <Environment
      files="/img/sunset.hdr"
      background
      ground={{
        height: height,
        radius: radius,
        scale: scale,
      }}
      backgroundBlurriness={0}
    />
  )
}



export default function App() {
  const gltf = useLoader(GLTFLoader, '/models/scene.glb')

  return (
    <Canvas camera={{ position: [0, 20, 20], fov : 40 }}>
      <Env />
      <directionalLight position={[3.3, 1.0, 4.4]} />
      <primitive object={gltf.scene} />
      <OrbitControls target={[0, 1, 0]} autoRotate maxPolarAngle={Math.PI / 2} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  )
}