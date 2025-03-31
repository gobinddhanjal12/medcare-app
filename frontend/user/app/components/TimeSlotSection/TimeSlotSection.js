import { Sun, Sunset } from "lucide-react";
import styles from "./TimeSlotSection.module.css";

const formatTime = (time) => {
  if (!time) return "Invalid Time";

  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const TimeSlotSection = ({
  title,
  icon,
  slots,
  selectedSlot,
  setSelectedSlot,
}) => {
  const IconComponent = icon === "Sun" ? Sun : Sunset;

  const availableSlotCount = slots.filter((slot) => slot.available).length;

  return (
    <div className={styles.slotSection}>
      <h3 className={styles.slotTitle}>
        <IconComponent /> {title}{" "}
        <span className={styles.slotCount}>{availableSlotCount} Slots</span>
      </h3>
      <hr className={styles.slotHr} />
      <div className={styles.slotGrid}>
        {slots.map((slot, index) => (
          <button
            key={index}
            className={`${styles.slotButton} ${
              selectedSlot === slot.time ? styles.selectedSlot : ""
            }`}
            onClick={() => slot.available && setSelectedSlot(slot.time)}
            disabled={!slot.available}
          >
            {formatTime(slot.time)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSection;