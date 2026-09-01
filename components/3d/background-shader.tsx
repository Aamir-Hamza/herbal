"use client"

import { Suspense, useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useGpuTier } from "@/components/3d/use-gpu-tier"
import { useLenis } from "lenis/react"

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = (uMouse - 0.5) * 0.35;
    float t = uTime * 0.07;
    float n = fbm(uv * 2.4 + mouse + vec2(t, uScroll * 0.0004));
    n += 0.35 * fbm(uv * 6.0 - mouse * 1.4 - vec2(t * 0.6, -t));

    vec3 stone = vec3(0.973, 0.976, 0.961);
    vec3 sage = vec3(0.639, 0.694, 0.541);
    vec3 forest = vec3(0.059, 0.161, 0.118);
    vec3 gold = vec3(0.831, 0.686, 0.216);

    vec3 col = mix(stone, sage, smoothstep(0.28, 0.72, n) * 0.42);
    col = mix(col, forest, smoothstep(0.62, 0.92, n) * 0.12);
    col = mix(col, gold, pow(smoothstep(0.55, 0.95, n), 3.0) * 0.16);

    float caustic = pow(noise(uv * 8.0 + vec2(t * 1.4, uScroll * 0.0006)), 6.0);
    col += gold * caustic * 0.18;

    gl_FragColor = vec4(col, 0.55);
  }
`

function ShaderPlane() {
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const lenis = useLenis()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uScroll: { value: 0 },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
      }),
    [],
  )

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      )
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uMouse.value.lerp(mouse.current, 0.045)
    const scrollY = lenis?.scroll ?? window.scrollY
    material.uniforms.uScroll.value = THREE.MathUtils.lerp(
      material.uniforms.uScroll.value as number,
      scrollY,
      0.08,
    )
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function ShaderCanvasInner() {
  return (
    <Canvas
      orthographic
      dpr={1}
      frameloop="always"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
        depth: false,
        stencil: false,
      }}
      camera={{ zoom: 1, position: [0, 0, 1] }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ShaderPlane />
      </Suspense>
    </Canvas>
  )
}

export function BackgroundShader() {
  const tier = useGpuTier()

  if (tier !== "high") return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <ShaderCanvasInner />
    </div>
  )
}
