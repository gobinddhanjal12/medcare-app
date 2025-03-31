"use client";
import Image from "next/image";
import styles from "./HomePage.module.css";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <h1 className={styles.title}>Medcare Admin.</h1>
      </div>
      <div className={styles.right}>
        <Image
          src="/images/homepage.jpg"
          alt="healthcare"
          fill
          style={{ objectFit: "cover", scale: 1.4 }}
        />
      </div>
    </div>
  );
};

export default HomePage;
