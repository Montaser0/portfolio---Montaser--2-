"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
 

function GlowingSphere() {
  // استخدام any مؤقتاً لتجاوز نقص تعريفات الأنواع لـ three في البيئة الحالية
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <MeshDistortMaterial
          color="#14b8a6"
          emissive="#14b8a6"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRings() {
  // استخدام any مؤقتاً لنفس السبب المذكور أعلاه
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, Math.PI / 6, 0]}>
        <torusGeometry args={[3.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  // استخدام any مؤقتاً لنفس السبب المذكور أعلاه
  const groupRef = useRef<any>(null);
  
  const particles = [
    { pos: [3, 1, 0] as [number, number, number], size: 0.08, color: "#14b8a6" },
    { pos: [-2.5, 1.5, 1] as [number, number, number], size: 0.06, color: "#06b6d4" },
    { pos: [2, -1.5, -1] as [number, number, number], size: 0.05, color: "#f59e0b" },
    { pos: [-3, -1, 0.5] as [number, number, number], size: 0.07, color: "#14b8a6" },
    { pos: [1.5, 2, 1.5] as [number, number, number], size: 0.04, color: "#06b6d4" },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={2 + i * 0.3} floatIntensity={0.5}>
          <mesh position={p.pos}>
            <sphereGeometry args={[p.size, 16, 16]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      <GlowingSphere />
      <OrbitingRings />
      <FloatingParticles />
      
      <Environment preset="city" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function CodeScene3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
