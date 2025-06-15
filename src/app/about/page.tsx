"use client";

import { useEffect } from "react";
import styles from "./about.module.css";
import Navbar from "@/components/Navbar";

export default function About() {
  useEffect(() => {
    // Apply background class
    const bgContainer = document.querySelector(".background-container");
    if (bgContainer) {
      bgContainer.className = "background-container about-bg";
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            Learn more about our secure authentication system
          </p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.text}>
              Our mission is to provide a secure, reliable, and user-friendly
              authentication system for web applications. We believe that
              security should never compromise user experience, which is why
              we've built a solution that combines robust security measures with
              an intuitive interface.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.text}>
              Founded in 2023, our team of security experts and UX designers
              came together with a shared vision: to simplify authentication
              while enhancing security. After months of development and testing,
              we're proud to offer a solution that meets the needs of modern web
              applications.
            </p>
          </section>

          <div className={styles.featuresGrid}>
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
                Our authentication system is built with security as the top
                priority, implementing industry best practices and standards.
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
                Add an extra layer of security with our easy-to-implement
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

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Team</h2>
            <p className={styles.text}>
              Our team consists of experienced developers, security experts, and
              UX designers who are passionate about creating secure and
              user-friendly authentication solutions. We're constantly learning
              and improving our system to stay ahead of emerging security
              threats.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
