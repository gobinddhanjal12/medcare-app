"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        window.location.href = "/";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h2>Admin Login</h2>

        {error && <p className={styles.error}>{error}</p>}
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

          <label>Password</label>
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginbtn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            className={styles.resetbtn}
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
