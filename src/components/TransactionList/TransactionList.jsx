import { useState, useEffect, useCallback } from "react";
import { CSVLink } from "react-csv";
import Filter from "../Filter/Filter";
import Transaction from "../Transaction/Transaction";
import "./TransactionList.css";

export default function TransactionList({ transactions = [] }) {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilteredTransactions(Array.isArray(transactions) ? transactions : []);
  }, [transactions]);

  const handleFilter = useCallback(
    ({ category, minAmount, maxAmount, type, dateRange }) => {
      const filtered = (Array.isArray(transactions) ? transactions : []).filter(
        (transaction) => {
          if (type && transaction.type && transaction.type !== type)
            return false;

          if (category && transaction.category !== category) return false;

          if (dateRange && transaction.date) {
            const transactionDate = new Date(transaction.date);
            const now = Date.now();
            let startDate;
            if (dateRange === "lastWeek") {
              startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
            } else if (dateRange === "lastMonth") {
              startDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
            } else if (dateRange === "lastYear") {
              startDate = new Date(now - 365 * 24 * 60 * 60 * 1000);
            }
            if (startDate && transactionDate < startDate) return false;
          }

          // Amount filter
          const amount = transaction.amount;
          if (minAmount && amount < Number(minAmount)) return false;
          if (maxAmount && amount > Number(maxAmount)) return false;

          return true;
        }
      );

      setFilteredTransactions(filtered);
    },
    [transactions]
  );

  const handleReset = useCallback(() => {
    setFilteredTransactions(Array.isArray(transactions) ? transactions : []);
    setIsOpen(false);
  }, [transactions]);

  // CSV headers
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Type", key: "type" },
    { label: "Date", key: "date" },
  ];

  const today = new Date().toISOString().split("T")[0];

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
