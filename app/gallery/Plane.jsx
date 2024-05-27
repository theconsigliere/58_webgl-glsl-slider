import { useRef, forwardRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"

import useStore from "../Stores/useStore"
import { NewShaderMaterial } from "./Shader"

function Plane({ texture, ...props }, ref) {
  const { viewport, size } = useThree()
  const gallerySlideWidth = useStore((state) => state.gallerySlideWidth)

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh {...props} scale={gallerySlideWidth} ref={ref}>
      <planeGeometry args={[1, 1, 24, 24]} />
      <newShaderMaterial
        key={NewShaderMaterial.key}
        uResolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        uTexture={texture}
      />
    </mesh>
  )
}

export default forwardRef(Plane)
