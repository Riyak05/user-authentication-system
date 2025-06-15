"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import styles from "./AuthForm.module.css";

interface FormField {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}

interface AuthFormProps {
  type: "signin" | "signup";
  onSubmit: (data: Record<string, string>) => Promise<void>;
  loading: boolean;
  error?: string;
}

export default function AuthForm({
  type,
  onSubmit,
  loading,
  error,
}: AuthFormProps) {
  const isSignUp = type === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const initialState: Record<string, string> = {
    email: "",
    password: "",
    ...(isSignUp ? { name: "" } : {}),
  };

  const [formData, setFormData] =
    useState<Record<string, string>>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (isSignUp && !formData.name?.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password?.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login functionality
  };

  const fields: FormField[] = [
    ...(isSignUp
      ? [
          {
            id: "name",
            name: "name",
            type: "text",
            label: "Full Name",
            placeholder: "John Doe",
            required: true,
          },
        ]
      : []),
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "you@example.com",
      autoComplete: "email",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: showPassword ? "text" : "password",
      label: "Password",
      placeholder: "••••••••",
      autoComplete: isSignUp ? "new-password" : "current-password",
      required: true,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>
          {isSignUp ? "Create your account" : "Welcome back"}
        </h2>

        {error && (
          <div className={styles.errorMessage}>
            <svg
              className={styles.errorIcon}
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
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <div className={styles.socialButtons}>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => handleSocialLogin("google")}
          >
            <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Google
          </button>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => handleSocialLogin("github")}
          >
            <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        <div className={styles.divider}>or continue with email</div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formFields}>
            {fields.map((field) => (
              <div key={field.id} className={styles.formField}>
                <label htmlFor={field.id} className={styles.label}>
                  {field.label}
                </label>
                <div className={styles.inputGroup}>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    className={styles.input}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                  {field.name === "password" && (
                    <div
                      className={styles.inputIcon}
                      onClick={togglePasswordVisibility}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                {validationErrors[field.name] && (
                  <p
                    className={styles.errorMessage}
                    style={{
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                      marginBottom: 0,
                    }}
                  >
                    {validationErrors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!isSignUp && (
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading && (
              <svg
                className={styles.buttonLoader}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            )}
            {loading
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
              ? "Create account"
              : "Sign in"}
          </button>
        </form>

        <div className={styles.switchText}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link
            href={isSignUp ? "/signin" : "/signup"}
            className={styles.switchLink}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </div>
      </div>
    </div>
  );
}
