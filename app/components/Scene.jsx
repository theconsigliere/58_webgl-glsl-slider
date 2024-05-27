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

import useStore from "../Stores/useStore"

export default function Scene() {
  // TODO ADD PROPS TO LEVA
  // TODO GALLERY MARGIN
  // TODO GALLERY POSITIONS
  // TODO GRID MARGIN
  // TODO GRID POSITIONS
  // TODO SET UP ACTIVE INDEX

  const images = Store()

  const galleryProps = useControls("Gallery Props", {
    margin: { value: 0.45, min: 0.0, max: 10 },
  })

  // update the store with gallery Props
  // const galleryMargin = useStore((state) => state.galleryMargin)
  // const setGalleryMargin = useStore((state) => state.setGalleryMargin)

  // const imageStore = useStore((state) => state.images)
  // const galleryPositions = useStore((state) => state.galleryPositions)
  // const setGalleryPositions = useStore((state) => state.setGalleryPositions)

  const gridPositions = useStore((state) => state.gridPositions)
  const setGridPositions = useStore((state) => state.setGridPositions)

  console.log(gridPositions)

  setGridPositions()

  console.log(gridPositions)

  // console.log(gridPositions)

  // // reset Gallery Positions when margin changes
  // if (galleryMargin !== galleryProps.margin) {
  //   setGalleryMargin(galleryProps.margin)
  //   setGalleryPositions()
  // }

  //

  return (
    <>
      <GalleryDOM images={images} />
      <Canvas dpr={[1, 2]} style={{ backgroundColor: "#141414" }}>
        <Perf position={"bottom-left"} />
        <ScrollControls distance={9}>
          <GalleryScene galleryProps={galleryProps} images={images} />
        </ScrollControls>
      </Canvas>
    </>
  )
}
