"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Lock } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (!tokenFromUrl) {
      setError("Invalid or expired reset link.");
    } else {
      setToken(tokenFromUrl);
    }
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [message, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Your password has been reset successfully.");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h2>Set New Password</h2>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <label>Confirm Password</label>
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginbtn} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button
            type="button"
            className={styles.resetbtn}
            onClick={() => {
              setPassword("");
              setConfirmPassword("");
              setError(null);
              setMessage(null);
            }}
            disabled={loading}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
}
