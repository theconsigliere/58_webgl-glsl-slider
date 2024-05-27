import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"
import { useControls } from "leva"

import useStore from "../Stores/useStore"
import GalleryScene from "./GalleryScene"

export default function SelectorScene() {
  //Config
  const { viewport } = useThree()

  // LEVA
  const levaProps = useControls("Gallery Props", {
    galleryMargin: { value: 1.5, min: 0.0, max: 10 },
    galleryWidth: { value: 4, min: 1.5, max: 10 },
  })

  //deffer value

  const {
    imagesLength,
    setGallerySlideWidth,
    setGallerySlideMargin,
    gallerySlideMargin,
    setGalleryPositions,
  } = useStore((state) => state)

  // Gallery
  useEffect(() => {
    setGallerySlideWidth(viewport.width / levaProps.galleryWidth)
    setGallerySlideMargin(levaProps.galleryMargin)
    setGalleryPositions()
  }, [viewport.width, levaProps])

  return (
    <>
      <ScrollControls distance={imagesLength}>
        <GalleryScene />
      </ScrollControls>
    </>
  )
}
