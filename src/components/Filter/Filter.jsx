import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { BudgetContext } from "../../context/BudgetContext";
import "./Filter.css";

export default function Filter({ isOpen, onFilter, onReset, setIsOpen }) {
  const { transactions } = useContext(BudgetContext);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const types = Array.isArray(transactions)
    ? [...new Set(transactions.map((t) => t.type).filter(Boolean))]
    : [];
  const categories = Array.isArray(transactions)
    ? [...new Set(transactions.map((t) => t.category).filter(Boolean))]
    : [];

  const handleTypeChange = (value) => {
    setType(value);
    onFilter({ type: value, category, dateRange, minAmount, maxAmount });
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    onFilter({ type, category: value, dateRange, minAmount, maxAmount });
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    onFilter({ type, category, dateRange: value, minAmount, maxAmount });
  };

  const handleMinAmountChange = (value) => {
    setMinAmount(value);
    onFilter({ type, category, dateRange, minAmount: value, maxAmount });
  };

  const handleMaxAmountChange = (value) => {
    setMaxAmount(value);
    onFilter({ type, category, dateRange, minAmount, maxAmount: value });
  };

  // Prevent default form submission
  const handleSubmit = (e) => {
    e.preventDefault();
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
    <dialog open data-testid="filter-form">
      <form onSubmit={handleSubmit}>
        <button
          className="close-button"
          onClick={() => setIsOpen(false)}
          aria-label="Close filter dialog"
        >
          ×
        </button>
        <div>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            onChange={(e) => handleDateRangeChange(e.target.value)}
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
            onChange={(e) => handleMinAmountChange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maxAmount">Max Amount</label>
          <input
            id="maxAmount"
            type="number"
            value={maxAmount}
            onChange={(e) => handleMaxAmountChange(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleReset}>
          Reset Filters
        </button>
      </form>
    </dialog>,
    document.getElementById("filter") || document.body
  );
}
