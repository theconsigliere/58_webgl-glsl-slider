"use client"
import { Canvas } from "@react-three/fiber"
import { Perf } from "r3f-perf"

import GalleryDOM from "../Gallery/DOM"
import SelectorScene from "../Gallery/SelectorScene"

export default function Scene() {
  return (
    <>
      <GalleryDOM />
      <Canvas dpr={[1, 2]} style={{ backgroundColor: "#141414" }}>
        <Perf position={"bottom-left"} />
        <SelectorScene />
      </Canvas>
    </>
  )
}
