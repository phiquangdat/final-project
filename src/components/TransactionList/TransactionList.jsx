import { useState, useEffect } from "react";
import Filter from "../Filter";
import Transaction from "../Transaction";

export default function TransactionList({ transactions }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleFilter = ({
    type,
    category,
    dateRange,
    minAmount,
    maxAmount,
  }) => {
    const filtered = transactions.filter((transaction) => {
      if (type && transaction.type !== type) return false;

      if (category && transaction.category !== category) return false;

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

      const amount = transaction.amount;
      if (minAmount && amount < Number(minAmount)) return false;
      if (maxAmount && amount > Number(maxAmount)) return false;

      return true;
    });

    setFilteredTransactions(filtered);
  };

  const handleReset = () => {
    setFilteredTransactions(transactions);
  };

  return (
    <div>
      <h3>Transactions</h3>
      <i
        onClick={() => setIsOpen((prev) => !prev)}
        className="fa fa-filter"
        style={{ fontSize: "48px" }}
      ></i>
      <Filter
        isOpen={isOpen}
        onFilter={handleFilter}
        onReset={handleReset}
        transactions={transactions}
      />
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
