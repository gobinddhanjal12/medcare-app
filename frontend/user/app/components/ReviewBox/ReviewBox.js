"use client";

import { useState } from "react";
import styles from "./ReviewBox.module.css";
import { Star } from "lucide-react";

const ReviewBox = ({ appointmentId, onSuccess }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!rating || rating < 1 || rating > 5) {
      setMessage("Please select a rating between 1 and 5.");
      return;
    }

    const requestBody = {
      appointment_id: appointmentId,
      rating: Number(rating),
      comment,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setMessage("Review submitted successfully!");
        setRating(null);
        setComment("");
        onSuccess();
      } else {
        setMessage(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessage("Error submitting review");
    }
  };

  return (
    <div className={styles.reviewBox}>
      <h3 className={styles.title}>Leave a Review</h3>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className={
              star <= (hover || rating) ? styles.starFilled : styles.starEmpty
            }
          />
        ))}
      </div>
      <textarea
        className={styles.commentBox}
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ReviewBox;
