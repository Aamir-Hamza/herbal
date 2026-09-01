"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

function bottleProfile(inset = 0) {
  const s = 1 - inset
  return [
    [0.01, -1.32],
    [0.5 * s, -1.32],
    [0.58 * s, -1.24],
    [0.6 * s, -1.05],
    [0.57 * s, 0.22],
    [0.52 * s, 0.52],
    [0.34 * s, 0.82],
    [0.2 * s, 0.98],
    [0.175 * s, 1.12],
    [0.175 * s, 1.34],
    [0.22 * s, 1.38],
    [0.18 * s, 1.42],
  ].map(([x, y]) => new THREE.Vector2(x, y))
}

type ElixirBottleProps = {
  transmission?: boolean
  glassColor?: string
  liquidColor?: string
}

export function ElixirBottle({
  transmission = false,
  glassColor = "#7d9a78",
  liquidColor = "#C4A35A",
}: ElixirBottleProps) {
  const shell = useMemo(() => new THREE.LatheGeometry(bottleProfile(0), 64), [])
  const liquidGeo = useMemo(
    () => new THREE.LatheGeometry(bottleProfile(0.14), 48),
    [],
  )
  const liquidMat = useRef<THREE.MeshPhysicalMaterial>(null)
  const glassMat = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetGlass = useMemo(() => new THREE.Color(glassColor), [glassColor])
  const targetLiquid = useMemo(() => new THREE.Color(liquidColor), [liquidColor])
  const curGlass = useRef(new THREE.Color(glassColor))
  const curLiquid = useRef(new THREE.Color(liquidColor))

  useFrame(() => {
    curGlass.current.lerp(targetGlass, 0.08)
    curLiquid.current.lerp(targetLiquid, 0.08)
    glassMat.current?.color.copy(curGlass.current)
    if (liquidMat.current) {
      liquidMat.current.color.copy(curLiquid.current)
      liquidMat.current.emissive.copy(curLiquid.current).multiplyScalar(0.18)
    }
  })

  return (
    <group>
      <mesh geometry={liquidGeo} position={[0, -0.08, 0]} scale={[1, 0.82, 1]}>
        <meshPhysicalMaterial
          ref={liquidMat}
          color={liquidColor}
          roughness={0.28}
          metalness={0.22}
          transparent
          opacity={0.86}
          emissive={liquidColor}
          emissiveIntensity={0.14}
        />
      </mesh>

      <mesh geometry={shell}>
        {transmission ? (
          <MeshTransmissionMaterial
            backside
            samples={5}
            resolution={256}
            thickness={0.62}
            roughness={0.06}
            ior={1.42}
            chromaticAberration={0.035}
            anisotropy={0.15}
            distortion={0.08}
            distortionScale={0.18}
            temporalDistortion={0.08}
            color={glassColor}
            attenuationColor="#1B3B2B"
            attenuationDistance={1.4}
          />
        ) : (
          <meshPhysicalMaterial
            ref={glassMat}
            color={glassColor}
            roughness={0.06}
            metalness={0.04}
            transmission={0.88}
            thickness={0.55}
            ior={1.42}
            transparent
            opacity={0.96}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        )}
      </mesh>

      <mesh position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.205, 0.016, 10, 48]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.16} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.21, 0.225, 0.22, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh position={[0, 1.64, 0]}>
        <cylinderGeometry args={[0.155, 0.2, 0.08, 32]} />
        <meshStandardMaterial color="#E5C378" metalness={1} roughness={0.12} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.07, 24, 16]} />
        <meshStandardMaterial color="#F1D48A" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  )
}
