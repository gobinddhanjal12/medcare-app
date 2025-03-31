"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./DoctorReviews.module.css";
import ReviewCard from "../ReviewCard/ReviewCard";

const DoctorReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/doctor/${id}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setReviews(data.data);
        } else {
          setError("Failed to fetch reviews");
        }
      } catch (err) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading reviews...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews available</p>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorReviews;
