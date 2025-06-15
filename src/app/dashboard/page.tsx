"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./dashboard.module.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authProvider, setAuthProvider] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    const provider = localStorage.getItem("authProvider");
    const storedName = localStorage.getItem("userName");

    if (authStatus !== "true") {
      // Redirect to sign-in page if not authenticated
      router.push("/signin");
    } else {
      setIsAuthenticated(true);
      setAuthProvider(provider);
      if (storedName) {
        setUserName(storedName);
      }
      setIsLoading(false);

      // Apply background class
      const bgContainer = document.querySelector(".background-container");
      if (bgContainer) {
        bgContainer.className = "background-container dashboard-bg";
      }
    }
  }, [router]);

  // Helper function to delete a cookie
  const deleteCookie = (name: string) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  const handleSignOut = () => {
    // Clear authentication state from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authProvider");
    localStorage.removeItem("userName");

    // Also clear the auth cookie
    deleteCookie("authToken");

    // Dispatch event to update auth state across components
    window.dispatchEvent(new Event("authChange"));

    // Redirect to home page
    router.push("/");
  };

  const getAuthProviderDisplay = () => {
    switch (authProvider) {
      case "google":
        return (
          <div className={styles.authProvider}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
              className={styles.providerIcon}
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
            <span>Signed in with Google</span>
          </div>
        );
      case "linkedin":
        return (
          <div className={styles.authProvider}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
              className={styles.providerIcon}
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
            <span>Signed in with LinkedIn</span>
          </div>
        );
      case "github":
        return (
          <div className={styles.authProvider}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
              className={styles.providerIcon}
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
            <span>Signed in with GitHub</span>
          </div>
        );
      case "email":
        return (
          <div className={styles.authProvider}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={styles.providerIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Signed in with Email</span>
          </div>
        );
      case "demo":
        return (
          <div className={styles.authProvider}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={styles.providerIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <span>Signed in with Demo Account</span>
          </div>
        );
      default:
        return (
          <div className={styles.authProvider}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={styles.providerIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Authenticated User</span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.contentSection}>
          <div className={styles.contentContainer}>
            <div className={styles.header}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <Image
                    src="/images/avatar-placeholder.png"
                    alt={userName}
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h1 className={styles.title}>Welcome, {userName}!</h1>
                  <p className={styles.subtitle}>
                    You've successfully signed in to your account
                  </p>
                  {getAuthProviderDisplay()}
                </div>
              </div>
            </div>

            <div className={styles.welcomeCard}>
              <div className={styles.welcomeIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2>Authentication Successful</h2>
              <p>
                You have successfully authenticated and accessed the dashboard.
                This is a protected page that only authenticated users can see.
              </p>
              <button onClick={handleSignOut} className={styles.signOutButton}>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <div className={styles.decorativeCircle}></div>
              <div className={styles.decorativeSquare}></div>
              <h2 className={styles.imageTitle}>Welcome to Your Dashboard</h2>
              <p className={styles.imageText}>
                You're now logged in and can access all the features of your
                account. Manage your profile, settings, and more from this
                secure dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
