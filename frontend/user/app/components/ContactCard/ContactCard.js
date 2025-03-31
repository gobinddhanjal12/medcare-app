import { Phone } from "lucide-react";
import styles from "./ContactCard.module.css";

const ContactCard = ({ contact }) => {
  return (
    <div className={styles.contactCard}>
      <div className={styles.contactInfo}>
        <h3>{contact.name}</h3>
        <p className={styles.description}>{contact.description}</p>
        <a
          href={`tel:${contact.number.replace(/-/g, "")}`}
          className={styles.phoneNumber}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Phone size={16} />
          {contact.number}
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
