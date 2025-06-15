"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./signup.module.css";
import Navbar from "@/components/Navbar";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    // Apply background class
    const bgContainer = document.querySelector(".background-container");
    if (bgContainer) {
      bgContainer.className = "background-container signup-bg";
    }
  }, []);

  // Helper function to set a cookie
  const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setAuthMessage("Creating your account...");

    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting to sign up...");
      // Call the signup API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Store auth state in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authProvider", "email");
      localStorage.setItem("userName", data.user.name);

      // Show success message
      setAuthMessage("Account created successfully! Redirecting...");

      // Also set in cookies for the middleware
      setCookie("authToken", data.token, 1); // 1 day expiry

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during sign up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setGoogleLoading(true);
    setError("");
    setAuthMessage("Connecting to Google...");

    // In a real app, this would redirect to Google OAuth flow
    console.log("Signing up with Google");

    // Simulate Google authentication delay
    setTimeout(() => {
      setAuthMessage("Google authentication successful!");

      setTimeout(() => {
        try {
          // Store auth state in localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("authProvider", "google");
          localStorage.setItem("userName", "Google User");

          // Also set in cookies for the middleware
          setCookie("authToken", "google-auth-token", 1); // 1 day expiry

          // Redirect to dashboard
          router.push("/dashboard");
        } catch (error) {
          console.error("Registration error:", error);
          setError("An error occurred during sign up. Please try again.");
        } finally {
          setGoogleLoading(false);
        }
      }, 1000);
    }, 1500);
  };

  const handleLinkedinSignUp = () => {
    setLinkedinLoading(true);
    setError("");
    setAuthMessage("Connecting to LinkedIn...");

    // In a real app, this would redirect to LinkedIn OAuth flow
    console.log("Signing up with LinkedIn");

    // Simulate LinkedIn authentication delay
    setTimeout(() => {
      setAuthMessage("LinkedIn authentication successful!");

      setTimeout(() => {
        try {
          // Store auth state in localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("authProvider", "linkedin");
          localStorage.setItem("userName", "LinkedIn User");

          // Also set in cookies for the middleware
          setCookie("authToken", "linkedin-auth-token", 1); // 1 day expiry

          // Redirect to dashboard
          router.push("/dashboard");
        } catch (error) {
          console.error("Registration error:", error);
          setError("An error occurred during sign up. Please try again.");
        } finally {
          setLinkedinLoading(false);
        }
      }, 1000);
    }, 1500);
  };

  const handleGithubSignUp = () => {
    setGithubLoading(true);
    setError("");
    setAuthMessage("Connecting to GitHub...");

    // In a real app, this would redirect to GitHub OAuth flow
    console.log("Signing up with GitHub");

    // Simulate GitHub authentication delay
    setTimeout(() => {
      setAuthMessage("GitHub authentication successful!");

      setTimeout(() => {
        try {
          // Store auth state in localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("authProvider", "github");
          localStorage.setItem("userName", "GitHub User");

          // Also set in cookies for the middleware
          setCookie("authToken", "github-auth-token", 1); // 1 day expiry

          // Redirect to dashboard
          router.push("/dashboard");
        } catch (error) {
          console.error("Registration error:", error);
          setError("An error occurred during sign up. Please try again.");
        } finally {
          setGithubLoading(false);
        }
      }, 1000);
    }, 1500);
  };

  const handleDemoLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      try {
        // Store auth state in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("authProvider", "demo");
        localStorage.setItem("userName", "Demo User");

        // Also set in cookies for the middleware
        setCookie("authToken", "demo-auth-token", 1); // 1 day expiry

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Authentication error:", error);
        setError("An error occurred during sign in. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>Create an account</h1>
            <p className={styles.subtitle}>
              Sign up to get started with our service
            </p>

            {error && <div className={styles.errorMessage}>{error}</div>}
            {authMessage && (
              <div className={styles.authMessage}>{authMessage}</div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your full name"
                  required
                />
              </div>

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

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.passwordInput}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={styles.icon}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={styles.icon}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className={styles.passwordHint}>
                  Password must be at least 8 characters
                </p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className={styles.terms}>
                <input
                  type="checkbox"
                  id="terms"
                  className={styles.checkbox}
                  required
                />
                <label htmlFor="terms" className={styles.termsLabel}>
                  I agree to the{" "}
                  <Link href="/terms" className={styles.termsLink}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className={styles.termsLink}>
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className={`${styles.button} ${
                  isLoading ? styles.loading : ""
                }`}
                disabled={
                  isLoading || googleLoading || linkedinLoading || githubLoading
                }
              >
                {isLoading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  "Create account"
                )}
              </button>

              <button
                onClick={handleDemoLogin}
                className={styles.demoButton}
                disabled={
                  isLoading || googleLoading || linkedinLoading || githubLoading
                }
              >
                Try with demo account
              </button>

              <div className={styles.divider}>
                <span>Or continue with</span>
              </div>

              <div className={styles.socialButtons}>
                <button
                  type="button"
                  className={`${styles.socialButton} ${
                    googleLoading ? styles.googleLoading : ""
                  }`}
                  onClick={handleGoogleSignUp}
                  disabled={
                    isLoading ||
                    googleLoading ||
                    linkedinLoading ||
                    githubLoading
                  }
                >
                  {googleLoading ? (
                    <div className={styles.googleSpinner}></div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="24px"
                      height="24px"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  )}
                  Google
                </button>

                <button
                  type="button"
                  className={`${styles.socialButton} ${
                    linkedinLoading ? styles.linkedinLoading : ""
                  }`}
                  onClick={handleLinkedinSignUp}
                  disabled={
                    isLoading ||
                    googleLoading ||
                    linkedinLoading ||
                    githubLoading
                  }
                >
                  {linkedinLoading ? (
                    <div className={styles.linkedinSpinner}></div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="24px"
                      height="24px"
                    >
                      <path
                        fill="#0288D1"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                      />
                      <path
                        fill="#FFF"
                        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                      />
                    </svg>
                  )}
                  LinkedIn
                </button>

                <button
                  type="button"
                  className={`${styles.socialButton} ${
                    githubLoading ? styles.githubLoading : ""
                  }`}
                  onClick={handleGithubSignUp}
                  disabled={
                    isLoading ||
                    googleLoading ||
                    linkedinLoading ||
                    githubLoading
                  }
                >
                  {githubLoading ? (
                    <div className={styles.githubSpinner}></div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="24px"
                      height="24px"
                    >
                      <path
                        fill="#24292F"
                        d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                      />
                      <path
                        fill="#FFF"
                        d="M24,7c9.374,0,17,7.626,17,17c0,7.112-4.393,13.412-11,15.9v-5.6c0-1.9-1.1-3.5-2.7-4.4c5.4-0.6,7.7-3.5,7.7-7.6c0-2.4-0.9-4.3-2.4-5.7c0.4-1.2,0.6-2.5,0.6-3.8c0-1.4-0.3-2.7-0.8-3.9c-2,0-3.5,0.7-5.1,1.9c-1.7-0.4-3.5-0.6-5.3-0.6c-1.8,0-3.6,0.2-5.3,0.6c-1.6-1.2-3.1-1.9-5.1-1.9c-0.5,1.2-0.8,2.5-0.8,3.9c0,1.3,0.2,2.6,0.6,3.8c-1.5,1.4-2.4,3.3-2.4,5.7c0,4.1,2.3,7,7.7,7.6c-1.6,0.9-2.7,2.5-2.7,4.4v5.6C11.393,37.412,7,31.112,7,24C7,14.626,14.626,7,24,7z"
                      />
                    </svg>
                  )}
                  GitHub
                </button>
              </div>

              <div className={styles.signinLink}>
                Already have an account?{" "}
                <Link href="/signin" className={styles.link}>
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.imageSection}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2 className={styles.imageTitle}>Join Our Community</h2>
              <p className={styles.imageText}>
                Create an account to access exclusive features and content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
