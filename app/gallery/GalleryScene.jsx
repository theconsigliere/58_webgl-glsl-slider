import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll, Image, useTexture } from "@react-three/drei"
import { damp, damp3, expo } from "maath/easing"
import Plane from "./Plane"

export default function GalleryScene({
  children,
  galleryProps,
  activeIndex,
  setActiveIndex,
  images,
}) {
  const scroll = useScroll()
  const objectRef = useRef()
  const imagesRef = useRef([])
  const { viewport } = useThree()

  const sliderMargin = galleryProps.margin
  let sliderWidth = viewport.width / 5

  // set initial gallery positions
  images.map((image, index) => {
    image.galleryPosition = [index * (sliderWidth + sliderMargin), 0, 0]
  })

  useFrame((state, delta) => {
    //* PARALLAX CAMERA
    damp3(
      state.camera.position,
      [-state.pointer.x / 2, state.pointer.y / 2, 4],
      0.3,
      delta
    )
    state.camera.lookAt(0, 0, 0)

    // snap camera on idle
    if (scroll.delta === 0) {
      damp3(state.camera.position, [0, 0, 4], 0.3, delta)
    }

    // loop through images and update their position
    imagesRef.current.forEach((image, index) => {
      damp(
        image.position,
        "x",
        images[index].galleryPosition[0] -
          // (sliderWidth + sliderMargin) - // offset to make first slide be in middle
          scroll.offset *
            (images.length - 1) * // when offset is in middle * (images.length - 1)
            (sliderWidth + sliderMargin),
        0.1,
        delta
      )
      // if image position is 1 or less or -1 or more than update greyscale value to 1
      if (Math.abs(image.position.x) > 1.5) {
        // lerp uniform to 0 to make it black and white
        damp(
          image.material.uniforms.distanceFromCenter,
          "value",
          0,
          0.45,
          delta
        )
      } else {
        // this is active!

        damp(
          image.material.uniforms.distanceFromCenter,
          "value",
          1,
          0.45,
          delta
        )

        setActiveIndex(index)
        //setActiveIndex(index)
      }

      // SNAP SCROLL
      // we have begun scrolling
      if (scroll.delta === 0 && scroll.offset > 0) {
        damp(
          image.position,
          "x",
          (sliderMargin + sliderWidth) * (index - activeIndex),
          0.25,
          delta,
          0.5,
          expo.inOut,
          0.1
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
          scale={sliderWidth}
          position={image.galleryPosition}
        />
      ))}

      {/* <Image url={`/images/${1}.jpg`} scale={sliderWidth} segments={10} /> */}
    </group>
  )
}
