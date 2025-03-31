"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Filter.module.css";

const ratingOptions = [
  { label: "Show all", value: null },
  { label: "1 star", value: 1 },
  { label: "2 stars", value: 2 },
  { label: "3 stars", value: 3 },
  { label: "4 stars", value: 4 },
  { label: "5 stars", value: 5 },
];

const experienceOptions = [
  { label: "Show all", value: null },
  { label: "15+ years", value: 15 },
  { label: "10-15 years", value: 10, max: 15 },
  { label: "5-10 years", value: 5, max: 10 },
  { label: "3-5 years", value: 3, max: 5 },
  { label: "1-3 years", value: 1, max: 3 },
  { label: "0-1 years", value: 0, max: 1 },
];

const genderOptions = ["Show All", "Male", "Female"];

const Filter = ({ onFilterChange }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getInitialFilters = () => ({
    rating: searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : null,
    experience: searchParams.get("experience")
      ? Number(searchParams.get("experience"))
      : null,
    gender: searchParams.get("gender") || "Show All",
  });

  const [filters, setFilters] = useState(getInitialFilters);

  useEffect(() => {
    setFilters(getInitialFilters());
  }, [searchParams]);

  const updateURLParams = (updatedFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value === null || value === "Show All") {
        params.delete(key);
        if (key === "experience") params.delete("max_experience");
      } else {
        params.set(key, value);
        if (key === "experience") {
          const max = experienceOptions.find((opt) => opt.value === value)?.max;
          if (max !== undefined) {
            params.set("max_experience", max);
          } else {
            params.delete("max_experience");
          }
        }
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleChange = (category, selectedValue) => {
    const updatedFilters = { ...filters, [category]: selectedValue };

    if (category === "experience") {
      const max = experienceOptions.find(
        (opt) => opt.value === selectedValue
      )?.max;
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    updateURLParams(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      rating: null,
      experience: null,
      gender: "Show All",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    updateURLParams(defaultFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <span>Filter By:</span>
        <button className={styles.resetButton} onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Rating</h4>
        {ratingOptions.map(({ label, value }) => (
          <label key={label} className={styles.filterLabel}>
            <input
              type="radio"
              name="rating"
              value={value || ""}
              checked={filters.rating === value}
              onChange={() => handleChange("rating", value)}
              className={styles.filterInput}
            />
            {label}
          </label>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Experience</h4>
        {experienceOptions.map(({ label, value }) => (
          <label key={label} className={styles.filterLabel}>
            <input
              type="radio"
              name="experience"
              value={value || ""}
              checked={filters.experience === value}
              onChange={() => handleChange("experience", value)}
              className={styles.filterInput}
            />
            {label}
          </label>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Gender</h4>
        {genderOptions.map((gender) => (
          <label key={gender} className={styles.filterLabel}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={() => handleChange("gender", gender)}
              className={styles.filterInput}
            />
            {gender}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
