// useComposer.ts
import { useRef, useEffect } from "react";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { DotScreenShader } from './shader/CustomShader';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import * as THREE from 'three';


const useComposer = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, gl: THREE.WebGLRenderer) => {
  const composer = useRef<EffectComposer>();
  useEffect(() => {
    if (gl && scene && camera) {
      composer.current = new EffectComposer(gl);
      composer.current.addPass(new RenderPass(scene, camera));
      
      const effect1 = new ShaderPass(DotScreenShader);
      effect1.uniforms['scale'].value = 4;
      composer.current.addPass(effect1);

      const effectFXAA = new ShaderPass(FXAAShader);
      effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
      composer.current.addPass(effectFXAA);
    }
  }, [scene, camera, gl]);
  return composer;
};

export default useComposer;
