"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const AppointmentRequest = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [timeSlotId, setTimeSlotId] = useState("");
  const [consultationType, setConsultationType] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    setDate(searchParams.get("date") || "");
    setTime(searchParams.get("time") || "");
    setDoctorId(searchParams.get("doctorId") || "");
    setTimeSlotId(searchParams.get("timeSlotId") || "");
    setConsultationType(searchParams.get("mode") || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!doctorId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/${doctorId}`
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Doctor not found");

        setDoctor(result.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace(
          `/login?redirect=${encodeURIComponent(window.location.href)}`
        );
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctor_id: Number(doctorId),
            appointment_date: date,
            time_slot_id: Number(timeSlotId),
            consultation_type: consultationType,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to book appointment");

      router.push(`/appointment-confirmation?id=${result.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <h1 className={styles.title}>Confirm Appointment Request</h1>
          <p className={styles.detail}>
            Please review the details before confirming.
          </p>

          {error && <p className={styles.error}>{error}</p>}

          {doctor ? (
            <div className={styles.doctorCard}>
              <Image
                width={200}
                height={200}
                src={doctor.photo_path}
                alt={doctor.name}
                className={styles.doctorImage}
              />
              <div className={styles.doctorInfo}>
                <h3 className={styles.doctorName}>{doctor.name}</h3>
                <p className={styles.specialty}>{doctor.specialty}</p>
                <p className={styles.location}>{doctor.location}</p>
                <p className={styles.experience}>
                  Experience: {doctor.experience} years
                </p>
                <p className={styles.fee}>Fee: ₹{doctor.consultation_fee}</p>
              </div>
            </div>
          ) : (
            <p>Loading doctor details...</p>
          )}

          <div className={styles.appointmentInfo}>
            <h2 className={styles.sectionTitle}>Appointment Details</h2>
            <p className={styles.info}>
              <strong>Date:</strong> {date}
            </p>
            <p className={styles.info}>
              <strong>Time:</strong> {time}
            </p>
            <p className={styles.info}>
              <strong>Time Slot ID:</strong> {timeSlotId}
            </p>
          </div>

          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Confirm Appointment"}
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default AppointmentRequest;
