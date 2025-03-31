import { useState } from "react";
import ReviewBox from "../ReviewBox/ReviewBox";
import styles from "./AppointmentCard.module.css";
import { Calendar, Clock, HashIcon, Laptop, MapPin, Stethoscope } from "lucide-react";
import Image from "next/image";

export const AppointmentCard = ({ appointment }) => {
  const [canReview, setCanReview] = useState(appointment.can_review);

  const handleReviewSubmit = () => {
    setCanReview(false);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getDate()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${amPm}`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.doctorDetail}>
        <Image
          src={appointment.doctor_photo}
          width={50}
          height={50}
          alt="doctor"
          className={styles.doctorImage}
        />

        <h3>{appointment.doctor_name}</h3>
      </div>

      <p className={styles.detail}>
        <HashIcon className={styles.icon} /> {appointment.id}
      </p>

      <p className={styles.detail}>
        <Stethoscope className={styles.icon} /> {appointment.specialty}
      </p>

      {appointment.consultation_type === "online" ? (
        <p className={styles.detail}>
          <Laptop className={styles.icon} /> Online
        </p>
      ) : (
        <p className={styles.detail}>
          <MapPin className={styles.icon} /> {appointment.location}
        </p>
      )}

      <p className={styles.detail}>
        <Calendar className={styles.icon} />{" "}
        {formatDate(appointment.appointment_date)}
      </p>

      <p className={styles.detail}>
        <Clock className={styles.icon} /> {formatTime(appointment.start_time)}
      </p>

      <p className={`${styles.status} ${styles[appointment.status]}`}>
        {appointment.status}
      </p>

      {canReview && (
        <ReviewBox
          appointmentId={appointment.id}
          onSuccess={handleReviewSubmit}
        />
      )}
    </div>
  );
};
