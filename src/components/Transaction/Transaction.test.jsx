import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BudgetContext } from "../../context/BudgetContext";
import Transaction from "./Transaction";

beforeEach(() => {
  const confirmContainer = document.createElement("div");
  confirmContainer.setAttribute("id", "confirm");
  document.body.appendChild(confirmContainer);
});

afterEach(() => {
  document.getElementById("confirm")?.remove();
});

test("deletes a transaction when confirmed", () => {
  const mockDeleteTransaction = vi.fn();
  const mockUpdateTransaction = vi.fn();

  const transaction = {
    id: "1",
    description: "Coffee",
    amount: -5,
    isOptimistic: false,
  };

  render(
    <BudgetContext.Provider
      value={{
        deleteTransaction: mockDeleteTransaction,
        updateTransaction: mockUpdateTransaction,
      }}
    >
      <Transaction transaction={transaction} />
    </BudgetContext.Provider>
  );

  // Click delete button to trigger confirmation modal
  fireEvent.click(screen.getByText("X"));

  // Ensure confirmation modal appears
  expect(screen.getByText("Are you sure?")).toBeInTheDocument();

  // Click confirm delete
  fireEvent.click(screen.getByText("Yes"));

  // Expect deleteTransaction to be called
  expect(mockDeleteTransaction).toHaveBeenCalledWith("1");
});
