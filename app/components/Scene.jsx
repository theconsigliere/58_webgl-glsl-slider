"use client"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
// import { Model } from "./Model"
import { Perf } from "r3f-perf"
import { ScrollControls, Scroll } from "@react-three/drei"
import { useControls } from "leva"

import GalleryScene from "../Gallery/GalleryScene"
import GalleryDOM from "../Gallery/DOM"
import Store from "../Gallery/Store"

export default function Scene() {
  const [activeIndex, setActiveIndex] = useState(0)

  const images = Store()

  const galleryProps = useControls("Gallery Props", {
    margin: { value: 0.45, min: 0.0, max: 10 },
    // amplitude: { value: 0.1, min: 0, max: 1 },
  })

  return (
    <>
      <GalleryDOM activeIndex={activeIndex} />
      <Canvas dpr={[1, 2]} style={{ backgroundColor: "#141414" }}>
        <Perf position={"bottom-left"} />
        <ScrollControls distance={9}>
          <GalleryScene
            galleryProps={galleryProps}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            images={images}
          />
        </ScrollControls>
      </Canvas>
    </>
  )
}
