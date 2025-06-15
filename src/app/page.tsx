"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";

export default function Home() {
  useEffect(() => {
    // Apply background class
    const bgContainer = document.querySelector(
      ".background-container"
    ) as HTMLElement;
    if (bgContainer) {
      bgContainer.className = "background-container home-bg";

      // Preload image
      const img = new Image();
      img.src = "/images/backgrounds/home-bg.jpg";
      img.onload = () => {
        console.log("Home background image loaded successfully");
        bgContainer.style.backgroundImage = `url('/images/backgrounds/home-bg.jpg')`;
      };
      img.onerror = () => {
        console.error("Failed to load home background image");
      };
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Secure Authentication for Modern Applications
            </h1>
            <p className={styles.heroText}>
              A powerful, flexible, and easy-to-use authentication system built
              with Next.js. Protect your users' data with state-of-the-art
              security.
            </p>
            <div className={styles.heroCta}>
              <Link href="/signup" className={styles.primaryButton}>
                Get Started
              </Link>
              <Link href="/signin" className={styles.secondaryButton}>
                Sign In
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImageInner}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.lockIcon}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <circle cx="12" cy="16" r="1"></circle>
              </svg>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Secure by Design</h3>
              <p className={styles.featureText}>
                Built with security best practices from the ground up, ensuring
                your users' data stays protected.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>
                Multi-factor Authentication
              </h3>
              <p className={styles.featureText}>
                Add an extra layer of security with easy-to-implement
                multi-factor authentication options.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
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
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Customizable UI</h3>
              <p className={styles.featureText}>
                Easily customize the look and feel of authentication forms to
                match your brand's identity.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Fast Integration</h3>
              <p className={styles.featureText}>
                Get up and running quickly with our well-documented API and
                ready-to-use components.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to get started?</h2>
            <p className={styles.ctaText}>
              Join thousands of developers who trust our authentication system.
            </p>
            <Link href="/signup" className={styles.ctaButton}>
              Create an Account
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
