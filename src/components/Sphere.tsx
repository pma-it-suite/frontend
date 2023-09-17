import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from 'three';

const Sphere = ({ vertexShader, fragmentShader, position, radius, side = THREE.FrontSide, cursorMovement = false }: { vertexShader: string, fragmentShader: string, position: THREE.Vector3, radius: number, side?: THREE.Side, cursorMovement?: boolean }) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();
  const uniforms = useMemo(() => ({ time: { value: 0 } }), []);

  useFrame(() => {
    if (uniforms.time) {
      uniforms.time.value += 0.01;
    }
  });

  // Cursor movement effect
  useEffect(() => {
    if (cursorMovement) {
      const onMouseMove = (event: MouseEvent) => {
        const x = event.clientX;
        const y = event.clientY;

        // Normalizing mouse coordinates between -1 and 1
        const mouseX = (x / window.innerWidth) * 2 - 1;
        const mouseY = -(y / window.innerHeight) * 2 + 1;

        if (meshRef.current) {
          // Scale the normalized coordinates for the desired movement effect
          meshRef.current.position.x = position.x - mouseX * 0.02;
          meshRef.current.position.y = position.y + mouseY * 0.02;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      return () => document.removeEventListener("mousemove", onMouseMove);
    }
  }, [position, cursorMovement]);


  return (
    <mesh ref={meshRef} position={position} receiveShadow castShadow>
      <sphereBufferGeometry attach="geometry" args={[radius, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={side}
      />
    </mesh>
  );
};

export default Sphere;
