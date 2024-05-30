import { useRef, forwardRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { damp } from "maath/easing"
import { useScroll } from "@react-three/drei"

import useStore from "../Stores/useStore"
import { NewShaderMaterial } from "./Shader"

function Plane({ texture, itemKey, ...props }, ref) {
  const { viewport, size } = useThree()
  const scroll = useScroll()
  const shaderRef = useRef()

  const { gallerySlideWidth, setActiveIndex, activeIndex, phase } = useStore(
    (state) => state
  )

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
      shaderRef.current.uniforms.uVelocity.value = scroll.delta

      // RAYCAST opacity in grid view
      if (activeIndex === itemKey && phase === "grid") {
        damp(
          shaderRef.current.uniforms.distanceFromCenter,
          "value",
          1,
          0.45,
          delta
        )
      } else {
        damp(
          shaderRef.current.uniforms.distanceFromCenter,
          "value",
          0.45,
          0.45,
          delta
        )
      }
    }
  })

  return (
    <mesh
      {...props}
      scale={gallerySlideWidth}
      ref={ref}
      onPointerEnter={(e) => {
        if (phase === "grid") setActiveIndex(itemKey)
      }}
      // onPointerLeave={(e) => {
      //    console.log("leave", itemKey)
      // }}
    >
      <planeGeometry args={[1, 1, 24, 24]} />
      <newShaderMaterial
        key={NewShaderMaterial.key}
        uResolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        uTexture={texture}
        ref={shaderRef}
      />
    </mesh>
  )
}

export default forwardRef(Plane)
