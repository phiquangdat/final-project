import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import Filter from "../Filter";
import Transaction from "../Transaction/Transaction";
import "./TransactionList.css";

export default function TransactionList({ transactions }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleFilter = ({
    category,
    minAmount,
    maxAmount,
    type,
    dateRange,
  }) => {
    const filtered = transactions.filter((transaction) => {
      if (type && transaction.type && transaction.type !== type) return false;

      if (category && transaction.category !== category) return false;

      if (dateRange && transaction.date) {
        const transactionDate = new Date(transaction.date);
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
    setIsOpen(false);
  };

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Type", key: "type" },
    { label: "Date", key: "date" },
  ];

  // Generate ISO date for filename
  const today = new Date().toISOString().split("T")[0]; // e.g., 2025-04-27

  return (
    <div>
      <div className="header">
        <h3>Transactions</h3>
        <div className="header-actions">
          <i
            onClick={() => setIsOpen((prev) => !prev)}
            className="fa fa-filter"
            data-testid="filter-toggle"
          ></i>
          <CSVLink
            data={filteredTransactions}
            headers={csvHeaders}
            filename={`transactions_${today}.csv`}
            className="export-button"
            data-testid="export-csv"
          >
            <i className="fa fa-download"></i> Export CSV
          </CSVLink>
        </div>
      </div>
      <Filter
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onFilter={handleFilter}
        onReset={handleReset}
        transactions={transactions}
      />
      <ul className="transaction-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <li>No transactions found</li>
        )}
      </ul>
    </div>
  );
}
