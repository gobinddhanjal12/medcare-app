"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import DoctorReviewCard from "../components/DoctorReviewCard/DoctorReviewCard";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?page=${page}&sort=${sort}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setReviews(data.data);
          setTotalPages(data.pagination.pages);
        } else {
          setError("Failed to fetch reviews");
        }
      } catch (err) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page, sort]);

  if (loading) return <p className={styles.loading}>Loading reviews...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Reviews</h2>
      <hr className={styles.hr} />

      <div className={styles.sortContainer}>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={styles.sortSelect}
        >
          <option className={styles.sortOptions} value="latest">
            Latest Reviews
          </option>
          <option className={styles.sortOptions} value="top-rated">
            Top Rated
          </option>
        </select>
      </div>

      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews available</p>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <DoctorReviewCard key={review.id} review={review} />
          ))}
        </ul>
      )}

      <div className={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;
