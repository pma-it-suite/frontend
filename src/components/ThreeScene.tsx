// ThreeScene.tsx 
// Creates a 3d three js scene and renders shapes with shaders
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import * as THREE from 'three';
import useComposer from "../useComposer";
import Sphere from "./Sphere";
import fragment from "../shader/fragment";
import fragment1 from "../shader/fragment1";
import vertex from "../shader/vertex";
import Plane from "./Plane";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
extend({ TextGeometry })

const SceneContent = () => {
    const { scene, camera, gl } = useThree();
    const composer = useComposer(scene, camera as THREE.PerspectiveCamera, gl);

    useFrame((_, delta) => {
        if (composer.current) {
            composer.current.render(delta);
        }
    }, 1);

    return (
        <>
            <Sphere vertexShader={vertex} side={THREE.BackSide} fragmentShader={fragment1} position={new THREE.Vector3(0, 0, 0)} radius={3.5} />
            <Sphere vertexShader={vertex} fragmentShader={fragment} cursorMovement={true} position={new THREE.Vector3(0, -0.6, 1)} radius={0.5} />
            <Plane fadeDuration={2} bufferTime={2} />
        </>
    );
};

const ThreeScene = () => {
    return (
            <Canvas className="fixed h-screen w-screen top-0 left-0 -z-10" camera={{ position: [0, 0, 2] }}>
                <SceneContent />
            </Canvas>
    );
};

export default ThreeScene;
