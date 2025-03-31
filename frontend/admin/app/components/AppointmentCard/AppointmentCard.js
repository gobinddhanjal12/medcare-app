import { useState } from "react";
import styles from "./AppointmentCard.module.css";
import { FaUserDoctor } from "react-icons/fa6";
import { Calendar, Clock, Laptop, MapPin, User } from "lucide-react";

export const AppointmentCard = ({ appointment, refreshAppointments }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      setErrorMessage("");
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/appointments/${appointment.id}/request-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      console.log(`Appointment ${appointment.id} ${newStatus} successfully`);
      refreshAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
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
      <h2 className={styles.title}>ID: {appointment.id}</h2>

      <p className={styles.detail}>
        <FaUserDoctor className={styles.icon} /> {appointment.doctor_name}
      </p>
      <p className={styles.detail}>
        <User className={styles.icon} /> {appointment.patient_name}
      </p>

      <p className={styles.detail}>
        <Calendar className={styles.icon} />{" "}
        {formatDate(appointment.appointment_date)}
      </p>

      <p className={styles.detail}>
        <Clock className={styles.icon} /> {formatTime(appointment.start_time)}
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

      <hr className={styles.line} />

      <div className={styles.buttons}>
        {loading ? (
          <button className={styles.loading}>Loading</button>
        ) : (
          <button
            className={styles.approve}
            onClick={() => handleStatusChange("approved")}
          >
            Approve
          </button>
        )}

        {loading ? (
          <button className={styles.loading}>Loading</button>
        ) : (
          <button
            className={styles.reject}
            onClick={() => handleStatusChange("rejected")}
          >
            Reject
          </button>
        )}
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
