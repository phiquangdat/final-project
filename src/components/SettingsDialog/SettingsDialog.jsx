import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { BudgetContext } from "../../context/BudgetContext";
import "./SettingsDialog.css";
export default function SettingsDialog({ isOpen, onClose }) {
  const { state, dispatch } = useContext(BudgetContext);
  if (!isOpen) return null;
  function handleCurrencyChange(e) {
    dispatch({
      type: "set_currency",
      payload: e.target.value,
    });
  }
  function handleThemeChange(e) {
    dispatch({
      type: "set_theme",
      payload: e.target.value,
    });
  }
  return createPortal(
    <div className="settings-overlay">
      <dialog open className="settings">
        <h2>Settings</h2>
        <div className="setting">
          <h3>Currency</h3>
          <select
            value={state.currency}
            name="currency"
            id="currency"
            onChange={handleCurrencyChange}
          >
            <option value="€">Euro (€)</option>
            <option value="$">Dollar ($)</option>
          </select>
        </div>
        <div className="setting">
          <h3>Theme</h3>
          <select
            value={state.theme}
            name="theme"
            id="theme"
            onChange={handleThemeChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="settings-buttons">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </dialog>
    </div>,
    document.getElementById("settings")
  );
}
