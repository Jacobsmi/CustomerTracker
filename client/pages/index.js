import styles from '../styles/Landing.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.logo}>
          Customer Tracker
        </div>
        <div className={styles.links}>
          <Link href="/login">
            <a className={styles.link}>Login</a>
          </Link>
          <Link href="/signup">
            <a className={styles.link}>Sign Up</a>
          </Link>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.tagline}>
          The best platform for tracking customer relationships and providing the optimal experience.
        </div>
        <Link href="/signup">
          <a className={styles.getstartedlink}>Get Started</a>
        </Link>
      </div>
    </div>
  )
}
