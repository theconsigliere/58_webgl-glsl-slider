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
    uVelocity: 0,
    uVelocityDirection: 1,
    // wireframe: true,
    // side: THREE.DoubleSide,
  },
  // THREE.doubleSide renders both sides of the plane

  /*vertex*/ `    
      uniform float uTime;  
      uniform float distanceFromCenter;
      uniform float uVelocity;
      uniform float uVelocityDirection;
      varying vec2 vUv;


      #define M_PI 3.1415926535897932384626433832795


      void main()
      {

        //Position
        vec3 pos = position;

        // scale the plane when distanceFromCenter is 1
        pos.xy *= 1.+ (distanceFromCenter * 0.125);

        // squeeze the plane using the velocity
        pos.x += (sin(uv.y * M_PI) * (uVelocity * 10.)) * uVelocityDirection;

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
      uniform vec2 uPointer;
      uniform sampler2D uTexture;
      uniform float uVelocity;
     // uniform float uVelocityDirection;

      varying vec2 vUv;  

      #define M_PI 3.1415926535897932384626433832795

             
      void main()
      {
        vec4 photoTexture = texture2D(uTexture, vUv);

        // Makes non selected images black & white
        //  vec4 blackandWhite = vec4(photoTexture.r, photoTexture.r, photoTexture.r, .05);
        vec4 blackandWhite = vec4(photoTexture.r, photoTexture.g, photoTexture.b, .05);

        vec4 texture = mix(blackandWhite, photoTexture, distanceFromCenter);

        // color run effect on scroll
        // texture.r += uVelocity * 10.;
        // texture.g += uVelocity * 15.;

  

        gl_FragColor = texture;
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
      `
)

extend({ NewShaderMaterial })

export { NewShaderMaterial }
