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
    gridColumns: { value: 3, min: 2, max: 5, step: 1 },
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

  // FIRST USEEFFECT
  // 1. useeffect so we set the grid stuff after render so its ready
  useEffect(() => {
    // GALLERY
    setGallerySlideWidth(viewport.width / levaProps.galleryWidth)
    setGallerySlideMargin(levaProps.galleryMargin)
    setGalleryPositions()

    //GRID
    setGridSlideWidth(
      viewport.height /
        (levaProps.gridColumns + levaProps.gridMargin + levaProps.gridMargin)
    )

    setGridSlideMargin(levaProps.gridMargin)
    setGridColumns(levaProps.gridColumns)
    setGridPositions()
  }, [])

  // 2. everytime levachanges changes we need to reposition the grid / gallery

  useEffect(() => {
    // Gallery
    setGallerySlideWidth(viewport.width / levaProps.galleryWidth)
    setGallerySlideMargin(levaProps.galleryMargin)
    setGalleryPositions()
    console.log("gallery")

    // grid
    setGridSlideWidth(
      viewport.height /
        (levaProps.gridColumns + levaProps.gridMargin + levaProps.gridMargin)
    )

    setGridSlideMargin(levaProps.gridMargin)
    setGridColumns(levaProps.gridColumns)
    setGridPositions()
  }, [viewport, levaProps])
  //}, [viewport.width, levaProps, phase])

  return (
    <>
      <ScrollControls distance={imagesLength}>
        <GalleryScene />
      </ScrollControls>
    </>
  )
}
