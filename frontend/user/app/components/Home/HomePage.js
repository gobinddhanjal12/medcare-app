"use client";
import Image from "next/image";
import styles from "./HomePage.module.css";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <h1 className={styles.title}>Health in Your Hands.</h1>
        <p className={styles.description}>
          Take control of your healthcare with CareMate. Book appointments with
          ease, explore health blogs, and stay on top of your well-being, all in
          one place.
        </p>
        <button
          onClick={() => router.push("/appointments")}
          className={`${styles.button} btn`}
        >
          Get Started
        </button>
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
