"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./forgotPassword.module.css";
import Navbar from "@/components/Navbar";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Apply background class
    const bgContainer = document.querySelector(".background-container");
    if (bgContainer) {
      bgContainer.className = "background-container forgot-password-bg";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    // Validate email
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending request to /api/auth/forgot-password");
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }

      setMessage(data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            {!isSubmitted ? (
              <>
                <h1 className={styles.title}>Reset your password</h1>
                <p className={styles.subtitle}>
                  Enter your email address and we'll send you a link to reset
                  your password
                </p>

                {error && <div className={styles.errorMessage}>{error}</div>}
                {message && (
                  <div className={styles.successMessage}>{message}</div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} ${
                      isLoading ? styles.loading : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className={styles.spinner}></div>
                    ) : (
                      "Send reset link"
                    )}
                  </button>

                  <div className={styles.backLink}>
                    <Link href="/signin" className={styles.link}>
                      Back to sign in
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className={styles.successContainer}>
                <h2 className={styles.successTitle}>Check your email</h2>
                <p className={styles.successMessage}>
                  {message ||
                    "If an account exists with this email, you will receive a password reset link."}
                </p>
                <p className={styles.successSubtext}>
                  The link will expire in 1 hour.
                </p>
                <Link href="/signin" className={styles.button}>
                  Return to sign in
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={styles.imageSection}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2 className={styles.imageTitle}>Password Recovery</h2>
              <p className={styles.imageText}>
                We'll help you get back into your account safely and securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
