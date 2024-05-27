import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { Wireframe, shaderMaterial } from "@react-three/drei"

// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY
const NewShaderMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(),
    uPointer: new THREE.Vector2(),
    uTexture: null,
    uTime: 0,
    distanceFromCenter: 0,
    transparent: true,
    // wireframe: true,
    side: THREE.DoubleSide,
  },
  // THREE.doubleSide renders both sides of the plane

  /*vertex*/ `    
      uniform float uTime;  
      uniform float distanceFromCenter;
      varying vec2 vUv;


      void main()
      {

        //Position
        vec3 pos = position;

        // scale the plane when distanceFromCenter is 1
        pos.xy *= 1.+ (distanceFromCenter * 0.125);
        


        vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
        // Final position
        gl_Position = projectionMatrix * viewMatrix * modelPosition;


        // varying
        // zoom in effect when images is selected
        // -----------------------------
        vUv = (uv - vec2(0.5)) / (1.25 - (0.1 * distanceFromCenter)*(2. - distanceFromCenter)) + vec2(0.5);

      }
      `,
  /*fragment*/ `
      uniform float uTime;
      uniform float distanceFromCenter;
      uniform vec2 uResolution;
      uniform vec2 pointer;
      uniform sampler2D uTexture;

      varying vec2 vUv;  

             
      void main()
      {
        vec4 photoTexture = texture2D(uTexture, vUv);

        // Makes non selected images black & white
        //  vec4 blackandWhite = vec4(photoTexture.r, photoTexture.r, photoTexture.r, .05);
        vec4 blackandWhite = vec4(photoTexture.r, photoTexture.g, photoTexture.b, .05);

        gl_FragColor = mix(blackandWhite, photoTexture, distanceFromCenter);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
      `
)

extend({ NewShaderMaterial })

export { NewShaderMaterial }
