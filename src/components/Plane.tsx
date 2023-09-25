// Plane.tsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

interface PlaneProps {
    fadeDuration: number;
    bufferTime: number;
}

const Plane = ({ fadeDuration, bufferTime }: PlaneProps) => {
    const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
    const timerRef = useRef<number | null>(null);
    const bufferCompleteRef = useRef(false);

    useFrame((state, delta) => {
        if (materialRef.current) {
            if (!bufferCompleteRef.current) {
                if (timerRef.current === null) {
                    timerRef.current = setTimeout(() => {
                        bufferCompleteRef.current = true;
                    }, bufferTime * 1000) as unknown as number;
                }
            } else {
                materialRef.current.opacity -= delta / fadeDuration;
                if (materialRef.current.opacity <= 0) {
                    materialRef.current.opacity = 0;
                    materialRef.current.transparent = true;
                }
            }
        }
    });

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    return (
        <mesh position={[0, 0, 2]}>
            <planeBufferGeometry attach="geometry" args={[7, 7]} />
            <meshBasicMaterial
                ref={materialRef}
                attach="material"
                color="#000000"
                side={THREE.DoubleSide}
                transparent
                opacity={1}
            />
        </mesh>
    );
};

export default Plane;
