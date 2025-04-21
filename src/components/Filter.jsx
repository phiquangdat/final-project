import React, { useState, useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

const Filter = ({ onFilter, onReset }) => {
  const { transactions } = useContext(BudgetContext);

  // State for filter values
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // Get unique categories from transactions
  const categories = [...new Set(transactions.map((t) => t.category))];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ type, category, dateRange, minAmount, maxAmount });
  };

  // Handle reset
  const handleReset = () => {
    setType("");
    setCategory("");
    setDateRange("");
    setMinAmount("");
    setMaxAmount("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} data-testid="filter-form">
      <div>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
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
        />
      </div>

      <div>
        <label htmlFor="maxAmount">Max Amount</label>
        <input
          id="maxAmount"
          type="number"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
      </div>

      <button type="submit">Apply Filters</button>
      <button type="button" onClick={handleReset}>
        Reset Filters
      </button>
    </form>
  );
};

export default Filter;
