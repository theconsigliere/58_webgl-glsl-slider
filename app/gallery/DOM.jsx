import { gsap } from "gsap/all"
import { useRef, useEffect } from "react"
import styles from "../styles/gallery-dom.module.css"

export default function GalleryDOM({ activeIndex, images }) {
  const titles = useRef([])
  const titlesList = useRef()

  useEffect(() => {
    gsap.to(titlesList.current, {
      duration: 1.15,
      ease: "expo.out",
      yPercent: -activeIndex * (100 / images.length),
    })
  }, [activeIndex])

  return (
    <>
      <div className={styles.titleSection}>
        <div className={styles.titleViewfinder}>
          <div className={styles.titleList} ref={titlesList}>
            {images.map((image, index) => {
              return (
                <div
                  key={index}
                  className={styles.titleDiv}
                  ref={(el) => (titles.current[index] = el)}
                >
                  <h3 className={styles.title}>{image.title}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
