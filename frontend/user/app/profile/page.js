"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user data");
        }

        setUser(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
      </h1>
      <hr className={styles.hr} />
      {user && (
        <div className={styles.profileContainer}>
          <div className={styles.left}>
            <div className={styles.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={user.name}
                className={styles.name}
                disabled
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                disabled
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="joined">Joined</label>
              <input
                id="joined"
                name="joined"
                type="text"
                value={new Date(user.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                disabled
              />
            </div>

            <div className={styles.inputGroup}>
              <button
                className={`${styles.logoutBtn} btn`}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
