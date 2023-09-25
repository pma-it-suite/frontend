import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import * as THREE from 'three';
import useComposer from "@/useComposer";
import Sphere from "./Sphere";
import fragment from "../shader/fragment";
import fragment1 from "../shader/fragment1";
import vertex from "../shader/vertex";

const SceneContent = ({ loginClicked }: { loginClicked: boolean }) => {
    const { scene, camera, gl } = useThree();
    const composer = useComposer(scene, camera as THREE.PerspectiveCamera, gl);
    const sphereRef = useRef<THREE.Mesh | null>(null);

    useFrame((_, delta) => {
        if (composer.current) {
            composer.current.render(delta);
        }
        if (loginClicked && sphereRef.current) {
            sphereRef.current.position.lerp(new THREE.Vector3(0, 0, 1.4), 0.2);
        }
    }, 1);

    return (
        <>
            <Sphere vertexShader={vertex} side={THREE.BackSide} fragmentShader={fragment1} position={new THREE.Vector3(0, 0, 0)} radius={3.5} />
            <Sphere ref={sphereRef} vertexShader={vertex} fragmentShader={fragment} cursorMovement={true && !loginClicked} position={new THREE.Vector3(0, -0.6, 1)} radius={0.5} />
        </>
    );
};

const ThreeScene = ({ loginClicked }: { loginClicked: boolean }) => {
    return (
        <>
            <Canvas className="fixed h-screen w-screen top-0 left-0 -z-10" camera={{ position: [0, 0, 2] }}>
                <SceneContent loginClicked={loginClicked} />
            </Canvas>
        </>
    );
};

export default ThreeScene;
