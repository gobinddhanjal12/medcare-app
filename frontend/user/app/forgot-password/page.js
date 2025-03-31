"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link has been sent to your email.");
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
        <h2>Forgot Password</h2>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <div className={styles.inputContainer}>
            <Mail className={styles.icon} size={18} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginbtn} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            type="button"
            className={styles.resetbtn}
            onClick={() => {
              setEmail("");
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
