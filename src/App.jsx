import { useState, useEffect, useContext, useOptimistic } from "react";
import "./budgettracker.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { BudgetContext } from "./context/BudgetContext";
function App() {
  const { saldo, transactions } = useContext(BudgetContext);
  const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
    transactions,
    (prev, newItem) => [...prev, newItem]
  );
  return (
    <div className="container">
      <h1 className="">Budget Tracker</h1>
      <div className="balance-box">
        <h3>Balance</h3>
        <p className="balance" id="balance">
          {saldo} €
        </p>
      </div>
      <TransactionForm setOptimisticTransactions={setOptimisticTransactions} />
      <TransactionList transactions={optimisticTransactions} />
    </div>
  );
}

export default App;
