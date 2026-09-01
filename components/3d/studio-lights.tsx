"use client"

import { Environment, Lightformer } from "@react-three/drei"

export function StudioLights({ mood = "day" }: { mood?: "day" | "night" }) {
  const night = mood === "night"

  return (
    <>
      <ambientLight intensity={night ? 0.22 : 0.35} />
      <hemisphereLight
        args={[night ? "#E5C378" : "#F4E7C3", "#0F291E", night ? 0.45 : 0.65]}
      />
      <spotLight
        position={[4, 6, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={night ? 2.8 : 2.2}
        color="#FFF6E0"
      />
      <spotLight
        position={[-3.5, 2.5, -2]}
        angle={0.6}
        penumbra={1}
        intensity={night ? 1.8 : 1.4}
        color="#D4AF37"
      />
      <pointLight position={[0.4, 0.2, 2.4]} intensity={1} color="#E5C378" />
      <Environment resolution={256} environmentIntensity={night ? 0.7 : 0.85}>
        <Lightformer
          intensity={3.2}
          position={[0, 4.5, 2]}
          scale={[12, 1.2, 1]}
          color="#FFF8E8"
        />
        <Lightformer
          intensity={1.8}
          position={[-5, 0.5, 1]}
          scale={[3, 8, 1]}
          color={night ? "#1B3B2B" : "#A3B18A"}
        />
        <Lightformer
          intensity={2.4}
          position={[5, 1, 2]}
          scale={[2.5, 6, 1]}
          color="#E5C378"
        />
        <Lightformer
          intensity={1.4}
          position={[0, -3, -2]}
          scale={[10, 4, 1]}
          color="#0F291E"
        />
      </Environment>
    </>
  )
}
