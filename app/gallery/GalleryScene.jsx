import { useEffect, useRef, memo } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll, useTexture } from "@react-three/drei"
import { damp, damp3, expo } from "maath/easing"
import Plane from "./Plane"

import useStore from "../Stores/useStore"

function GalleryScene() {
  const scroll = useScroll()
  const objectRef = useRef()
  const imagesRef = useRef([])
  let scrolltarget = 0

  const {
    activeIndex,
    setActiveIndex,
    images,
    imagesLength,
    gallerySlideWidth,
    gallerySlideMargin,
    galleryPositions,
    gridSlideWidth,
    gridSlideMargin,
    gridPositions,
    phase,
    previousPhase,
    setPreviousPhase,
  } = useStore((state) => state)

  // console.log("why re-render?", scroll)

  //grid view
  useEffect(() => {
    setPreviousPhase(phase)
    // animte to grid view
    if (phase === "grid") {
      //map through imagesRef
      imagesRef.current.forEach((image, index) => {
        // reposition
        //  damp3(image.position, gridPositions[index], 0.05, 1)
        // re-scale
        damp3(image.scale, gridSlideWidth, 0.25, 1)
        // set opacity to 0.85
        damp(image.material.uniforms.distanceFromCenter, "value", 0.45, 0.45, 1)
      })

      // prevent scrolling
    }

    // animate to gallery view
    if (phase === "gallery") {
      imagesRef.current.forEach((image, index) => {
        // from grid so that y is 0
        damp(image.position, "y", 0, 0.1, 1)
        // re-scale
        damp3(image.scale, gallerySlideWidth, 0.25, 1)
      })
    }
  }, [phase])

  // re-render if galleryPositions change

  useFrame((state, delta) => {
    // animate to grid view
    if (phase === "grid") {
      //map through imagesRef
      imagesRef.current.forEach((image, index) => {
        // reposition
        damp3(image.position, gridPositions[index], 0.125, delta)
      })
    }

    if (phase === "gallery") {
      // SCROLL FROM GRID TO GALLERY BUT DONT RUN IF WE ARE IN GALLERY VIEW

      // loop through images and update their position
      imagesRef.current.forEach((image, index) => {
        // SNAP SCROLL
        // we have begun scrolling
        if (scroll.delta === 0 && scroll.offset > 0) {
          //  console.log("snapping?", index)
          damp(
            image.position,
            "x",
            (gallerySlideMargin + gallerySlideWidth) * (index - activeIndex),
            0.25,
            delta,
            1,
            expo.out,
            0.01
          )
        } else {
          // scroll is moving
          damp(
            image.position,
            "x",
            galleryPositions[index][0] -
              // (sliderWidth + sliderMargin) - // offset to make first slide be in middle
              scroll.offset *
                (imagesLength - 1) * // when offset is in middle * (images.length - 1)
                (gallerySlideWidth + gallerySlideMargin),
            0.1,
            delta
          )
        }

        // ACTIVE OR NOT
        // if image position is 1 or less or -1 or more than update greyscale value to 1
        if (Math.abs(image.position.x) > 1.25) {
          // lerp uniform to 0 to make it black and white
          damp(
            image.material.uniforms.distanceFromCenter,
            "value",
            0,
            0.45,
            delta
          )
        } else {
          //* ACTIVE IMAGE
          damp(
            image.material.uniforms.distanceFromCenter,
            "value",
            1,
            0.45,
            delta
          )
          // set active index
          if (activeIndex !== index) {
            // console.log(
            //   "getting lost here?",
            //   "index:",
            //   index,
            //   "activeIndex",
            //   activeIndex
            // )
            setActiveIndex(index)
          }
        }
      })
    }
    //* PARALLAX CAMERA
    if (phase === "gallery") {
      damp3(
        state.camera.position,
        [-state.pointer.x / 2, state.pointer.y / 2, 4],
        0.25,
        delta
      )
    } else {
      damp3(state.camera.position, [0, 0, 4], 0.25, delta)
    }
    state.camera.lookAt(0, 0, 0)

    // INFINITE SCROLL
    // camera z index is 4

    // if image position is out of view (-4, 4)
    // get last image position X  || galleryPositions[imagesLength - 1][0]
    // get first image position X || galleryPositions[0][0]
    // activeIndez

    // get scroll direction
    if (scroll.offset > scrolltarget) {
      // forwards 1
      console.log("forwards")
    } else {
      // backwards -1
      console.log("backwards")
    }

    scrolltarget = scroll.offset
  })

  return (
    <group ref={objectRef}>
      {images.map((image, index) => (
        <Plane
          key={index}
          itemKey={index}
          ref={(el) => (imagesRef.current[index] = el)}
          texture={useTexture(image.src)}
          position={galleryPositions[index]}
        />
      ))}

      {/* <Image url={`/images/${1}.jpg`} scale={sliderWidth} segments={10} /> */}
    </group>
  )
}

// use memo to prevent re-render
export default memo(GalleryScene)
