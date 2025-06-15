"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Navbar.module.css";
import Logo from "./Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on mount and when localStorage changes
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        const name = localStorage.getItem("userName") || "";
        setIsAuthenticated(authStatus);
        setUserName(name);
      }
    };

    // Check auth on mount
    checkAuth();

    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener("storage", checkAuth);

    // Create a custom event listener for auth changes in the same tab
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authProvider");
    localStorage.removeItem("userName");

    // Clear cookies
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Dispatch event to update auth state across components
    window.dispatchEvent(new Event("authChange"));

    // Redirect to home page
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about", label: "About", icon: "info" },
    { href: "/contact", label: "Contact Us", icon: "mail" },
  ];

  // Add dashboard link if authenticated
  if (isAuthenticated) {
    navLinks.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: "dashboard",
    });
  }

  const getIcon = (name: string) => {
    switch (name) {
      case "home":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case "mail":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      case "dashboard":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logoSection}>
            <Logo />
            <div className={styles.desktopLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.activeLink : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.authButtons}>
            <div className={styles.authButtonsContainer}>
              {isAuthenticated ? (
                <>
                  <div className={styles.userProfile}>
                    <div className={styles.userAvatar}>
                      <Image
                        src="/images/avatar-placeholder.png"
                        alt={userName}
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className={styles.userName}>{userName}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className={styles.signOutButton}
                  >
                    <svg
                      className={styles.signOutButtonIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className={`${styles.signInButton} ${
                      pathname === "/signin"
                        ? styles.signInActive
                        : styles.signInInactive
                    }`}
                  >
                    <svg
                      className={styles.signInButtonIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Sign In
                  </Link>
                  <Link href="/signup" className={styles.signUpButton}>
                    <svg
                      className={styles.signUpButtonIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className={styles.mobileMenuButton}>
            <button
              onClick={toggleMenu}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className={styles.buttonIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className={styles.buttonIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${
                pathname === link.href
                  ? styles.mobileActiveLink
                  : styles.mobileInactiveLink
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.mobileNavLinkIcon}>
                {getIcon(link.icon)}
              </span>
              {link.label}
            </Link>
          ))}

          <div className={styles.mobileDivider}></div>

          {isAuthenticated ? (
            <>
              <div className={styles.mobileUserProfile}>
                <div className={styles.mobileUserAvatar}>
                  <Image
                    src="/images/avatar-placeholder.png"
                    alt={userName}
                    width={32}
                    height={32}
                  />
                </div>
                <span className={styles.mobileUserName}>{userName}</span>
              </div>
              <button
                onClick={handleSignOut}
                className={styles.mobileSignOutButton}
              >
                <svg
                  className={styles.mobileSignOutButtonIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sign Out
              </button>
            </>
          ) : (
            <div className={styles.mobileAuthButtons}>
              <Link
                href="/signin"
                className={styles.mobileSignInButton}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className={styles.mobileSignInButtonIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Sign In
              </Link>
              <Link
                href="/signup"
                className={styles.mobileSignUpButton}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className={styles.mobileSignUpButtonIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
