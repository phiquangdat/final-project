import { createPortal } from "react-dom";
import styles from './Confirm.module.css';

export default function Confirm({message, onConfirm, onCancel}) {
    return createPortal(
        <div className={styles.confirmOverlay}>
            <div className={styles.confirmDialog}>
                <h1>{message}</h1>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    , document.getElementById('confirm')
    );
}