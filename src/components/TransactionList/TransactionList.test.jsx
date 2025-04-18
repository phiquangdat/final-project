import { render, screen } from "@testing-library/react";
import { BudgetContext } from "../../context/BudgetContext";
import TransactionList from "./TransactionList";

describe("TransactionList Component", () => {
  const mockContextValue = {
    saldo: 200,
    transactions: [
      { id: 1, description: "Groceries", amount: -50 },
      { id: 2, description: "Salary", amount: 500 },
    ],
    updateTransaction: vi.fn(),
    deleteTransaction: vi.fn(),
  };

  it("renders the Transactions header correctly", () => {
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <TransactionList transactions={mockContextValue.transactions} />
      </BudgetContext.Provider>
    );

    const headerElement = screen.getByText(/Transactions/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders transaction list items correctly", () => {
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <TransactionList transactions={mockContextValue.transactions} />
      </BudgetContext.Provider>
    );

    const groceryTransaction = screen.getByText(/Groceries/i);
    const salaryTransaction = screen.getByText(/Salary/i);

    expect(groceryTransaction).toBeInTheDocument();
    expect(salaryTransaction).toBeInTheDocument();
  });

  it("handles empty transactions gracefully", () => {
    render(
      <BudgetContext.Provider value={{ ...mockContextValue, transactions: [] }}>
        <TransactionList transactions={[]} />
      </BudgetContext.Provider>
    );

    const headerElement = screen.getByText(/Transactions/i);
    expect(headerElement).toBeInTheDocument();

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });
});
