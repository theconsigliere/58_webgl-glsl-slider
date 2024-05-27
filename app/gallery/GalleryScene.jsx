import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll, useTexture } from "@react-three/drei"
import { damp, damp3, expo } from "maath/easing"
import Plane from "./Plane"

import useStore from "../Stores/useStore"

export default function GalleryScene() {
  const scroll = useScroll()
  const objectRef = useRef()
  const imagesRef = useRef([])

  const {
    activeIndex,
    setActiveIndex,
    images,
    imagesLength,
    gallerySlideWidth,
    gallerySlideMargin,
    galleryPositions,
  } = useStore((state) => state)

  // re-render if galleryPositions change

  useFrame((state, delta) => {
    //* PARALLAX CAMERA
    damp3(
      state.camera.position,
      [-state.pointer.x / 2, state.pointer.y / 2, 4],
      0.25,
      delta
    )
    state.camera.lookAt(0, 0, 0)

    // snap camera on idle
    // if (scroll.delta === 0) {
    //  // console.log("snap")
    //   damp3(state.camera.position, [0, 0, 4], 0.3, delta)
    // }

    // loop through images and update their position
    imagesRef.current.forEach((image, index) => {
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

      // if image position is 1 or less or -1 or more than update greyscale value to 1
      if (Math.abs(image.position.x) > 1) {
        // lerp uniform to 0 to make it black and white
        damp(
          image.material.uniforms.distanceFromCenter,
          "value",
          0,
          0.45,
          delta
        )

        // lerp --data-opacity to 0 to make it invisible
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
        setActiveIndex(index)
      }

      // SNAP SCROLL
      // we have begun scrolling
      if (scroll.delta === 0 && scroll.offset > 0) {
        damp(
          image.position,
          "x",
          (gallerySlideMargin + gallerySlideWidth) * (index - activeIndex),
          0.35,
          delta,
          1,
          expo.out,
          0.01
        )
      }
    })
  })

  return (
    <group ref={objectRef}>
      {images.map((image, index) => (
        <Plane
          key={index}
          ref={(el) => (imagesRef.current[index] = el)}
          texture={useTexture(image.src)}
          position={galleryPositions[index]}
        />
      ))}

      {/* <Image url={`/images/${1}.jpg`} scale={sliderWidth} segments={10} /> */}
    </group>
  )
}
