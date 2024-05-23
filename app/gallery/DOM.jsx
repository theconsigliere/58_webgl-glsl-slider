import { useEffect } from "react"
import styles from "../styles/gallery-dom.module.css"

export default function GalleryDOM({ activeIndex }) {
  useEffect(() => {
    console.log("activeIndex", activeIndex)
  }, [activeIndex])

  return <div className={styles.brandingSection}></div>
}
