import { useState, useEffect, useContext, useOptimistic } from "react";
import "./budgettracker.css";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import { BudgetContext } from "./context/BudgetContext";
import SettingsDialog from "./components/SettingsDialog/SettingsDialog";
import Charts from "./components/Charts";

function App() {
  const { saldo, transactions, state } = useContext(BudgetContext);
  const [showSettings, setShowSettings] = useState(false);
  const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
    transactions,
    (prev, newItem) => [...prev, newItem]
  ); 

  return (
    <div className="wrapper">
      <div
        className="container"
        style={
          state.theme === "dark"
            ? { backgroundColor: "#333" }
            : { backgroundColor: "#fff" }
        }
      >
        <SettingsDialog
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="">Budget Tracker</h1>
          <i
            class="fa fa-cog"
            aria-hidden="true"
            onClick={() => setShowSettings(true)}
          ></i>
        </div>
        <div className="balance-box">
          <h3>Balance</h3>
          <p className="balance" id="balance">
            {saldo} {state.currency}
          </p>
        </div>
        <TransactionForm
          setOptimisticTransactions={setOptimisticTransactions}
        />
        <TransactionList transactions={optimisticTransactions} />
      </div>
      <div className="container">
        <h2>Pie Chart - Expenses across different categories</h2>
        <Charts
          type="pie"
          transactions={transactions}
          options={{ responsive: true }}
        />
        <h2>Bar Chart - Monthly Income vs Expenses</h2>
        <Charts
          type="bar"
          transactions={transactions}
          options={{ responsive: true }}
        />
        <h2>Line Chart - Savings Over Time</h2>
        <Charts
          type="line"
          transactions={transactions}
          options={{ responsive: true }}
        />
      </div>
    </div>
  );
}

export default App;
