import { render, screen } from "@testing-library/react";
import { BudgetContext } from "./context/BudgetContext";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("Budget Tracker App", () => {
  // Mock the BudgetContext data
  const mockSaldo = 200;
  const mockTransactions = [
    { id: 1, description: "Groceries", amount: -50 },
    { id: 2, description: "Salary", amount: 500 },
  ];

  it("renders the Budget Tracker header", () => {
    render(
      <BudgetContext.Provider
        value={{ saldo: mockSaldo, transactions: mockTransactions }}
      >
        <App />
      </BudgetContext.Provider>
    );

    // Assert the header is rendered
    const headerElement = screen.getByText(/Budget Tracker/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("displays the correct balance", () => {
    render(
      <BudgetContext.Provider
        value={{ saldo: mockSaldo, transactions: mockTransactions }}
      >
        <App />
      </BudgetContext.Provider>
    );

    // Assert the balance is displayed correctly
    const balanceElement = screen.getByText("200 €");
    expect(balanceElement).toBeInTheDocument();
  });

  it("renders TransactionForm", () => {
    render(
      <BudgetContext.Provider
        value={{ saldo: mockSaldo, transactions: mockTransactions }}
      >
        <App />
      </BudgetContext.Provider>
    );

    // Assert that TransactionForm is rendered
    const transactionFormElement = screen.getByText(/add transaction/i); // Adjust as needed based on actual placeholder
    expect(transactionFormElement).toBeInTheDocument();
  });

  it("renders a transaction description", () => {
    render(
      <BudgetContext.Provider
        value={{ saldo: mockSaldo, transactions: mockTransactions }}
      >
        <App />
      </BudgetContext.Provider>
    );

    // Assert that a transaction description is rendered
    const transactionListElement = screen.getByText(/Groceries/i);
    expect(transactionListElement).toBeInTheDocument();
  });
});
