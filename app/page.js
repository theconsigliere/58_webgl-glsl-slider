import dynamic from "next/dynamic"
import styles from "./page.module.css"
import Branding from "./Components/Branding"
import Loading from "./Components/Loading"

const Scene = dynamic(() => import("./Components/Scene"), {
  ssr: false,
  loading: () => <Loading />,
})

export default function Home() {
  return (
    <main className={styles.main}>
      <Branding number={5} />
      <Scene />
    </main>
  )
}
