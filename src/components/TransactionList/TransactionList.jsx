import { useState } from "react";
import Filter from "../Filter";
import Transaction from "../Transaction";

export default function TransactionList({ transactions }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  // Handle filter application
  const handleFilter = ({
    type,
    category,
    dateRange,
    minAmount,
    maxAmount,
  }) => {
    const filtered = transactions.filter((transaction) => {
      // Type filter
      if (type && transaction.type !== type) return false;

      // Category filter
      if (category && transaction.category !== category) return false;

      // Date range filter
      const transactionDate = new Date(transaction.date);
      if (dateRange) {
        const now = new Date();
        let startDate;
        if (dateRange === "lastWeek") {
          startDate = new Date(now.setDate(now.getDate() - 7));
        } else if (dateRange === "lastMonth") {
          startDate = new Date(now.setMonth(now.getMonth() - 1));
        } else if (dateRange === "lastYear") {
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        }
        if (startDate && transactionDate < startDate) return false;
      }

      // Amount filter
      const amount = transaction.amount;
      if (minAmount && amount < Number(minAmount)) return false;
      if (maxAmount && amount > Number(maxAmount)) return false;

      return true;
    });

    setFilteredTransactions(filtered);
  };

  // Handle reset
  const handleReset = () => {
    setFilteredTransactions(transactions);
  };

  return (
    <div>
      <h3>Transactions</h3>
      <Filter onFilter={handleFilter} onReset={handleReset} />
      {filteredTransactions && (
        <ul className="transaction-list">
          {filteredTransactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  );
}
