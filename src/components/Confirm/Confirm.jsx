import { createPortal } from "react-dom";
import styles from "./Confirm.module.css";

export default function Confirm({ message, onConfirm, onCancel, errors = [] }) {
  const hasErrors = errors.length > 0;

  return createPortal(
    <div
      className={styles.confirmOverlay}
      role="dialog"
      aria-labelledby="confirm-title"
    >
      <div className={styles.confirmDialog}>
        <h1 id="confirm-title">{message}</h1>

        {hasErrors && (
          <div className={styles.errorContainer} role="alert">
            {errors.map((error, index) => (
              <p key={index} className={styles.errorMessage}>
                {error}
              </p>
            ))}
          </div>
        )}

        <div className={styles.buttonContainer}>
          {hasErrors ? (
            ""
          ) : (
            <button onClick={onConfirm} className={styles.confirmButton}>
              Yes
            </button>
          )}

          <button onClick={onCancel} className={styles.cancelButton}>
            {hasErrors ? "Dismiss" : "No"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("confirm")
  );
}
