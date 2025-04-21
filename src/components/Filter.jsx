import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { BudgetContext } from "../context/BudgetContext";

export default function Filter({ isOpen, onFilter, onReset, setIsOpen }) {
  const { transactions } = useContext(BudgetContext);
  const styles = {
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "18px",
      cursor: "pointer",
    },
  };
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const types = [...new Set(transactions.map((t) => t.type))];
  const categories = [...new Set(transactions.map((t) => t.category))];

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ type, category, dateRange, minAmount, maxAmount });
  };

  const handleReset = () => {
    setType("");
    setCategory("");
    setDateRange("");
    setMinAmount("");
    setMaxAmount("");
    onReset();
  };
  if (!isOpen) return null;
  return createPortal(
    <dialog open>
      <form onSubmit={handleSubmit} data-testid="filter-form">
        <button style={styles.closeButton} onClick={() => setIsOpen(false)}>
          &times;
        </button>
        <div>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateRange">Date Range</label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="">All Time</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
        <div>
          <label htmlFor="minAmount">Min Amount</label>
          <input
            id="minAmount"
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            step="500"
          />
        </div>
        <div>
          <label htmlFor="maxAmount">Max Amount</label>
          <input
            id="maxAmount"
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            step="500"
          />
        </div>
        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleReset}>
          Reset Filters
        </button>
      </form>
    </dialog>,
    document.getElementById("filter")
  );
}
