import { useRef } from "react";
import { CircleChevronRight } from "lucide-react";
import styles from "./DateSelector.module.css";

const DateSelector = ({ dates, selectedDate, setSelectedDate, scrollRight }) => {
    const scrollContainerRef = useRef(null);

    return (
        <div className={styles.dateSelectorWrapper}>
            <div className={styles.dateSelector} ref={scrollContainerRef}>
                {dates.map((item) => (
                    <button
                        key={item.date}
                        className={`${styles.dateButton} ${selectedDate.date === item.date ? styles.activeDate : ""}`}
                        onClick={() => setSelectedDate(item)}
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

export default DateSelector;
