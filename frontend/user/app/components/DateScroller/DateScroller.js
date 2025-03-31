import { useRef } from "react";
import { CircleChevronRight } from "lucide-react";
import styles from "./DateScroller.module.css";

const DateScroller = ({ dates, selectedDate, setSelectedDate }) => {
  const scrollContainerRef = useRef(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        scrollContainerRef.current.querySelector(`.${styles.dateButton}`)
          .offsetWidth * 7;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.dateSelectorWrapper}>
      <div className={styles.dateSelector} ref={scrollContainerRef}>
        {dates.map((item) => (
          <button
            key={item.date}
            className={`${styles.dateButton} ${
              selectedDate.toDateString() ===
              new Date(
                `${item.date}, ${new Date().getFullYear()}`
              ).toDateString()
                ? styles.activeDate
                : ""
            }`}
            onClick={() => {
              const [month, day] = item.date.split(" ");
              const parsedDate = new Date(
                `${month} ${day}, ${new Date().getFullYear()}`
              );
              setSelectedDate(parsedDate);
            }}
          >
            <span className={styles.day}>{item.day}</span>
            <span className={styles.date}>{item.date}</span>
          </button>
        ))}
      </div>

      <button className={styles.scrollButton} onClick={scrollRight}>
        <CircleChevronRight size={28} />
      </button>
    </div>
  );
};

export default DateScroller;
