import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TransactionForm from "./TransactionForm";
import { BudgetContext } from "../../context/BudgetContext";

// Mock the BudgetContext
const mockAddTransaction = vi.fn();
const BudgetContextProvider = ({ children }) => (
  <BudgetContext.Provider value={{ addTransaction: mockAddTransaction }}>
    {children}
  </BudgetContext.Provider>
);

describe("TransactionForm", () => {
  it("contains all required form fields", () => {
    render(
      <BudgetContextProvider>
        <TransactionForm />
      </BudgetContextProvider>
    );

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add transaction/i })
    ).toBeInTheDocument();
  });
});
