import Image from "next/image";
import styles from "./ReviewCard.module.css";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className={styles.starFilled} />);
      } else if (i - 0.5 === rating) {
        stars.push(<StarHalf key={i} className={styles.starHalf} />);
      } else {
        stars.push(<StarOutline key={i} className={styles.starEmpty} />);
      }
    }
    return stars;
  };


  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <li className={styles.reviewCard}>
      <p className={styles.stars}>
        <span className={styles.starContainer}>
          {renderStars(review.rating)}
        </span>
      </p>

      <p>{review.comment}</p>

      <hr className={styles.hr} />

      <div className={styles.bottom}>
        <div className={styles.patientInfo}>
          {review.patient_image ? (
            <Image
              width={100}
              height={100}
              src={review.patient_image}
              alt={review.patient_name}
              className={styles.patientImage}
            />
          ) : (
            <div className={styles.patientImage}>
              {getInitial(review.patient_name)}
            </div>
          )}
          <p className={styles.patientName}>{review.patient_name}</p>
        </div>

        <p className={styles.date}>
          {new Date(review.appointment_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </li>
  );
};

export default ReviewCard;
