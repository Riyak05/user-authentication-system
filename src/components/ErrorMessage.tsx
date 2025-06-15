import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className={styles.errorContainer} role="alert">
      <span className={styles.errorText}>{message}</span>
    </div>
  );
}
