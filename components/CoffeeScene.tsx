'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Latte() {
  const root = useRef<THREE.Group>(null!);
  const coffee = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  const compact = viewport.width < 6.5;
  useFrame(({ clock }, delta) => {
    if (!root.current) return;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.25 + Math.sin(clock.elapsedTime * 0.24) * 0.16, 2, delta);
    root.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.055;
    if (coffee.current) coffee.current.rotation.z += delta * 0.015;
  });
  const cupProfile = useMemo(() => [
    new THREE.Vector2(0, 0.12), new THREE.Vector2(0.88, 0.12), new THREE.Vector2(1.04, 0.2),
    new THREE.Vector2(1.18, 0.46), new THREE.Vector2(1.34, 1.75), new THREE.Vector2(1.32, 1.88),
    new THREE.Vector2(1.25, 1.91), new THREE.Vector2(1.22, 1.82), new THREE.Vector2(1.12, 0.52),
    new THREE.Vector2(0.96, 0.28), new THREE.Vector2(0, 0.28)
  ], []);
  return <group position={[compact ? 0 : 0.18, compact ? -0.45 : -0.25, 0]} scale={compact ? 0.88 : 1.08}>
    <group ref={root} rotation={[0.12, -0.25, -0.04]}>
      {/* Saucer: curved porcelain silhouette */}
      <mesh position={[0,-0.08,0]} castShadow receiveShadow><latheGeometry args={[[new THREE.Vector2(0,0),new THREE.Vector2(1.35,0),new THREE.Vector2(1.62,0.055),new THREE.Vector2(1.7,0.11),new THREE.Vector2(1.67,0.15),new THREE.Vector2(1.35,0.12),new THREE.Vector2(0,0.10)],96]}/><meshPhysicalMaterial color="#f0e6d6" roughness={0.22} metalness={0.04} clearcoat={1} clearcoatRoughness={0.13}/></mesh>
      <mesh position={[0,0.02,0]}><cylinderGeometry args={[1.18,1.18,0.025,96]}/><meshStandardMaterial color="#a8957e" roughness={0.4}/></mesh>
      {/* Cup body: true hollow lathe cross section */}
      <mesh castShadow receiveShadow><latheGeometry args={[cupProfile,128]}/><meshPhysicalMaterial color="#e9dfd1" roughness={0.17} metalness={0.06} clearcoat={1} clearcoatRoughness={0.12} side={THREE.DoubleSide}/></mesh>
      <mesh position={[0,1.866,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.285,0.043,12,128]}/><meshPhysicalMaterial color="#fff7e8" roughness={0.13} clearcoat={1}/></mesh>
      {/* Handle is a smooth elliptical tube connected to the cup */}
      <mesh position={[1.31,1.05,0]} rotation={[0,0,-0.13]} castShadow><torusGeometry args={[0.55,0.16,20,80,Math.PI*1.76]}/><meshPhysicalMaterial color="#e9dfd1" roughness={0.2} clearcoat={1}/></mesh>
      {/* Coffee surface and concentric crema rings */}
      <mesh ref={coffee} position={[0,1.785,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.21,128]}/><meshPhysicalMaterial color="#6a3822" roughness={0.22} metalness={0.02} clearcoat={1}/></mesh>
      <mesh position={[0,1.792,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[0.92,1.17,128]}/><meshStandardMaterial color="#bb7943" roughness={0.55} transparent opacity={0.9}/></mesh>
      <mesh position={[0,1.797,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[0.48,0.58,128]}/><meshStandardMaterial color="#e1b47d" roughness={0.65} transparent opacity={0.82}/></mesh>
      <mesh position={[0,1.8,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[0.31,64]}/><meshStandardMaterial color="#d3a373" roughness={0.7}/></mesh>
    </group>
  </group>;
}
function SceneContents() {
  const { viewport } = useThree();
  const compact = viewport.width < 6.5;
  return <>
    <color attach="background" args={['#07101c']}/>
    <ambientLight intensity={0.65}/>
    <hemisphereLight args={['#d2e2ff','#34201b',1.6]}/>
    <spotLight position={[-4,8,5]} intensity={95} angle={0.38} penumbra={0.9} color="#ffe2b4" castShadow shadow-mapSize={[1024,1024]}/>
    <pointLight position={[4,3,-4]} intensity={35} color="#6d8bc4"/>
    <pointLight position={[0,4,4]} intensity={13} color="#e6b77e"/>
    <Sparkles count={compact?18:35} scale={[8,5,3]} size={1.3} speed={0.15} opacity={0.3} color="#d6b68a"/>
    <Latte/>
    <ContactShadows position={[0,-0.56,0]} opacity={0.34} scale={6} blur={2.8} far={3} color="#02040a"/>
    <Environment preset="city" environmentIntensity={0.55}/>
  </>;
}
export default function CoffeeScene() {
  return <Canvas dpr={[1,1.6]} shadows camera={{position:[0,2.7,8.8],fov:35,near:0.1,far:100}} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}} fallback={<div className="canvas-fallback">Your browser cannot display the 3D scene.</div>}>
    <SceneContents/>
  </Canvas>;
}
