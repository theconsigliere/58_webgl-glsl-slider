import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY
const NewShaderMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(),
    uPointer: new THREE.Vector2(),
    uTexture: new THREE.Vector2(),

    // side: THREE.DoubleSide,
  },
  // THREE.doubleSide renders both sides of the plane

  /*vertex*/ `      
      varying vec2 vUv;
      void main()
      {
        //Position
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        // Final position
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vUv = uv;
      }
      `,
  /*fragment*/ `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 pointer;
      uniform sampler2D uTexture;

      varying vec2 vUv;  
             
      void main()
      {
        gl_FragColor = vec4(vUv, 0.0, 1.0);
      }`
)

extend({ NewShaderMaterial })

export { NewShaderMaterial }
