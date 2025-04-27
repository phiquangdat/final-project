import { useState, useContext } from "react";
import "./budgettracker.css";
import TransactionList from "./components/TransactionList/TransactionList";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import { BudgetContext } from "./context/BudgetContext";
import SettingsDialog from "./components/SettingsDialog/SettingsDialog";
import Charts from "./components/Charts";
import styled from "styled-components";
const DarkThemeWrapper = styled.div`
  background-color: #000;
  color: #fff;

  li {
    color: #000;
  }
`;
export function App() {
  const { saldo, transactions, state } = useContext(BudgetContext);
  const [showSettings, setShowSettings] = useState(false);

  const Wrapper = state.theme === "dark" ? DarkThemeWrapper : "div";

  return (
    <div className="wrapper">
      <Wrapper className="container">
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
            className="fa fa-cog"
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
        <TransactionForm />
        <TransactionList transactions={transactions} />
      </Wrapper>
      <Wrapper className="container">
        <h2>Pie Chart - Expenses across different categories</h2>
        <Charts
          type="pie"
          transactions={transactions}
          options={{ responsive: true }}
          isDarkTheme={state.theme === "dark"}
        />
        <h2>Bar Chart - Monthly Income vs Expenses</h2>
        <Charts
          type="bar"
          transactions={transactions}
          options={{ responsive: true }}
          isDarkTheme={state.theme === "dark"}
        />
        <h2>Line Chart - Savings Over Time</h2>
        <Charts
          type="line"
          transactions={transactions}
          options={{ responsive: true }}
          isDarkTheme={state.theme === "dark"}
        />
      </Wrapper>
    </div>
  );
}

export default App;
