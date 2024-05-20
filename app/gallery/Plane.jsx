import { useRef, forwardRef } from "react"
import { useThree } from "@react-three/fiber"

import { NewShaderMaterial } from "./Shader"

function Plane({ texture, ...props }, ref) {
  const { viewport, size } = useThree()

  console.log("Plane", texture)

  return (
    <mesh {...props} ref={ref}>
      <planeGeometry />
      <newShaderMaterial
        key={NewShaderMaterial.key}
        uResolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        uTexture={texture}
      />
    </mesh>
  )
}

export default forwardRef(Plane)
