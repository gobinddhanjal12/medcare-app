"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import styles from "./styles.module.css";

const AppointmentConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const appointmentId = searchParams.get("id");

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error("Authentication token not found. Please log in.");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/${appointmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        if (!response.ok)
          throw new Error(
            result.message || "Failed to fetch appointment details"
          );

        setAppointment(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  return (
    <Suspense fallback={<p>Loading appointment details...</p>}>
      <div className={styles.container}>
        <h1 className={styles.title}>Appointment Confirmation</h1>

        {loading && (
          <p className={styles.loading}>Loading appointment details...</p>
        )}
        {error && <p className={styles.error}>{error}</p>}

        {appointment && (
          <div className={styles.details}>
            <p className={styles.success}>
              Your appointment request has been submitted
            </p>

            <p className={styles.info}>
              <strong>Doctor:</strong> {appointment.doctor_name} (
              {appointment.specialty})
            </p>
            <p className={styles.info}>
              <strong>Location:</strong> {appointment.location}
            </p>
            <p className={styles.info}>
              <strong>Consultation Fee:</strong> ₹{appointment.consultation_fee}
            </p>
            <p className={styles.info}>
              <strong>Patient:</strong> {appointment.patient_name} (
              {appointment.patient_email})
            </p>
            <p className={styles.info}>
              <strong>Appointment Date:</strong>{" "}
              {appointment.appointment_date.split("T")[0]}
            </p>
            <p className={styles.info}>
              <strong>Time:</strong> {appointment.start_time} -{" "}
              {appointment.end_time}
            </p>
            <p className={styles.info}>
              <strong>Consultation Type:</strong>{" "}
              {appointment.consultation_type}
            </p>

            <button
              className={styles.homeButton}
              onClick={() => router.push("/")}
            >
              Go Back Home
            </button>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default AppointmentConfirmation;
