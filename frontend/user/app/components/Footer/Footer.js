import styles from "./Footer.module.css";
import { Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <p>© EmScripts {year}. All Right Reserved.</p>
      <div className={styles.icons}>
        <Phone className={styles.icon} />
        <MessageCircle className={styles.icon} />
      </div>
    </div>
  );
};

export default Footer;
