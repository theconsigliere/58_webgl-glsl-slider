import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll, Image, useTexture } from "@react-three/drei"
import { damp, damp3, expo } from "maath/easing"
import Plane from "./Plane"

export default function GalleryScene({ children, ...props }) {
  const scroll = useScroll()
  const objectRef = useRef()
  const imagesRef = useRef([])
  const [hovered, setHovered] = useState(false)
  const [clicked, setClick] = useState(false)
  const [scrollActivated, setScrollActivated] = useState(false)
  const { viewport } = useThree()
  const { galleryProps } = props
  let activeIndex = null
  const sliderMargin = galleryProps.margin

  let sliderWidth = viewport.width / 4

  // 8 images
  const images = [1, 2, 3, 4, 5, 1, 2, 3]
  const initialImagePositions = []

  // set initial gallery positions
  images.map((image, index) => {
    initialImagePositions[index] = index * (sliderWidth + sliderMargin)
  })

  // make sure we have the smae amount of imageRefs as images
  useEffect(() => {
    imagesRef.current = imagesRef.current.slice(0, images.length)
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

    // loop through images and update their position
    imagesRef.current.forEach((image, index) => {
      damp(
        image.position,
        "x",
        initialImagePositions[index] -
          // (sliderWidth + sliderMargin) - // offset to make first slide be in middle
          scroll.offset *
            (images.length - 1) * // when offset is in middle * (images.length - 1)
            (sliderWidth + sliderMargin),
        0.1,
        delta
      )

      // if image position is 1 or less or -1 or more than update greyscale value to 1
      if (Math.abs(image.position.x) > 1.5) {
        //   image.material.color.set("grey")
        // damp(image.material, "grayscale", 1, 0.45, delta)
        // damp(image.material, "opacity", 0.15, 0.45, delta)

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
        // damp(image.material, "grayscale", 0, 0.45, delta)
        // damp(image.material, "opacity", 1, 0.45, delta)

        damp(
          image.material.uniforms.distanceFromCenter,
          "value",
          1,
          0.45,
          delta
        )

        activeIndex = index
      }

      // // snap scroll on scroll

      // SNAP SCROLL

      // we have begun scrolling
      if (scroll.delta === 0 && scroll.offset > 0) {
        // snap to on scroll

        // if activeIndex is 1
        // index (0) - activeIndex (1) = -1
        // index (1) - activeIndex (1) = 0
        // index (2) - activeIndex (1) = 1

        // if activeIndex is 2
        // index (0) - activeIndex (2) = -2
        // index (1) - activeIndex (2) = -1
        // index (2) - activeIndex (2) = 0
        // index (3) - activeIndex (2) = 1

        damp(
          image.position,
          "x",
          (sliderMargin + sliderWidth) * (index - activeIndex),
          0.25,
          delta,
          0.3,
          expo.inOut,
          0.1
        )

        // sanp camera too
        damp3(state.camera.position, [0, 0, 4], 0.3, delta)
      }
    })
  })

  return (
    <group
      {...props}
      ref={objectRef}
      // onPointerOver={() => {
      //   setHovered(true)
      // }}
      // onPointerOut={() => {
      //   setHovered(false)
      // }}
    >
      {images.map((image, index) => (
        <Plane
          key={index}
          ref={(el) => (imagesRef.current[index] = el)}
          texture={useTexture(`/images/${image}.jpg`)}
          scale={sliderWidth}
          position={[initialImagePositions[index], 0, 0]}
        />
      ))}

      {/* <Image url={`/images/${1}.jpg`} scale={sliderWidth} segments={10} /> */}
    </group>
  )
}
