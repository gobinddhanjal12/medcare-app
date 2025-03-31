"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./styles.module.css";
import DoctorReviews from "@/app/components/DoctorReviews/DoctorReviews";
import Image from "next/image";
import {
  BookA,
  Clock,
  GraduationCap,
  MapPin,
  Stethoscope,
  StickyNote,
  Tag,
} from "lucide-react";

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDoctorDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch doctor details");
        const data = await res.json();
        setDoctor(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading)
    return <p className={styles.loading}>Loading doctor details...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!doctor) return <p className={styles.error}>Doctor not found</p>;

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.desktopBookButton}
          onClick={() => router.push(`/book-appointment/${id}`)}
        >
          Book Appointment
        </button>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <Image
            src={doctor.photo_path}
            alt={doctor.name}
            width={150}
            height={150}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.right}>
          <h2 className={styles.name}>{doctor.name}</h2>

          <div className={styles.details}>
            <span className={styles.detail}>
              <Stethoscope className={styles.icon} /> {doctor.specialty}
            </span>
            <span className={styles.detail}>
              <Clock className={styles.icon} /> {doctor.experience} Years
            </span>
          </div>

          <p className={styles.detail}>
            <MapPin className={styles.icon} /> {doctor.location}
          </p>
          <p className={styles.detail}>
            <Tag className={styles.icon} /> ₹{doctor.consultation_fee}
          </p>

          {doctor.education ? (
            <p className={styles.detail}>
              <GraduationCap className={styles.icon} /> {doctor.education}
            </p>
          ) : null}
          {doctor.bio ? (
            <p className={styles.detail}>
              <StickyNote className={styles.icon} /> {doctor.bio}
            </p>
          ) : null}
          {doctor.languages && doctor.languages.length > 0 ? (
            <p className={styles.detail}>
              <BookA className={styles.icon} /> {doctor.languages.join(", ")}
            </p>
          ) : null}

          <button
            className={styles.bookButton}
            onClick={() => router.push(`/book-appointment/${id}`)}
          >
            Book Appointment
          </button>

          <hr className={styles.hr}/>

          <DoctorReviews />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
