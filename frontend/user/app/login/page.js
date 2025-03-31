"use client";

import { useState, useEffect } from "react";
import styles from "./login.module.css";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
          }
          window.location.href = "/appointments";
        })
        .catch(() => (window.location.href = "/appointments"));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const loginData = { email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        window.location.href = "/appointments";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h2>Login</h2>
        <p>
          Are you a member? <Link href="/signup">Sign up here</Link>
        </p>
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
            onClick={() => {
              setEmail("");
              setPassword("");
              setError(null);
            }}
            disabled={loading}
          >
            Reset
          </button>

          <div className={styles.forgetPassword}>
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>

          <div className={styles.separator}>
            <span>or</span>
          </div>

          <button
            type="button"
            className={styles.googlebtn}
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={18} className={styles.googleIcon} /> Continue with
            Google
          </button>
        </form>
      </div>
    </div>
  );
}
