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
  const levaProps = useControls("Gallery / Grid Props", {
    galleryMargin: { value: 1.5, min: 0.0, max: 10 },
    galleryWidth: { value: 4, min: 1.5, max: 10 },
    gridMargin: { value: 1, min: 0.0, max: 10 },
    gridColumns: { value: 3, min: 2, max: 5 },
  })

  //deffer value

  const {
    imagesLength,
    setGallerySlideWidth,
    setGallerySlideMargin,
    setGalleryPositions,
    setGridSlideWidth,
    setGridSlideMargin,
    setGridColumns,
    setGridPositions,
    gridPositions,
    phase,
    gridSlideWidth,
  } = useStore((state) => state)

  // Gallery
  useEffect(() => {
    if (phase === "gallery") {
      setGallerySlideWidth(viewport.width / levaProps.galleryWidth)
      setGallerySlideMargin(levaProps.galleryMargin)
      setGalleryPositions()
    }
  }, [viewport.width, levaProps, phase])

  //grid
  useEffect(() => {
    setGridSlideWidth(
      viewport.height /
        (levaProps.gridColumns + levaProps.gridMargin + levaProps.gridMargin)
    )

    setGridSlideMargin(levaProps.gridMargin)
    setGridColumns(levaProps.gridColumns)
    setGridPositions()
  }, [phase, levaProps])
  //}, [viewport.width, levaProps, phase])

  return (
    <>
      <ScrollControls distance={imagesLength}>
        <GalleryScene />
      </ScrollControls>
    </>
  )
}
