import { useState, useEffect, useContext, useOptimistic } from "react";
import "./budgettracker.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { BudgetContext } from "./context/BudgetContext";
import SettingsDialog from "./components/SettingsDialog/SettingsDialog";
function App() {
  const { saldo, transactions, state } = useContext(BudgetContext);
  const [showSettings, setShowSettings] = useState(false);
  const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
    transactions,
    (prev, newItem) => [...prev, newItem]
  );
  return (
    <div
      className="container"
      style={
        state.theme == "dark"
          ? { backgroundColor: "#333" }
          : { backgroundColor: "#fff" }
      }
    >
      <SettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <h1 className="">Budget Tracker</h1>
      <div className="balance-box">
        <h3>Balance</h3>
        <p className="balance" id="balance">
          {saldo} {state.currency}
        </p>
      </div>
      <TransactionForm setOptimisticTransactions={setOptimisticTransactions} />
      <TransactionList transactions={optimisticTransactions} />
      <button onClick={() => setShowSettings(true)}>Settings</button>{" "}
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default App;
