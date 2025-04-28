import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TransactionList from "./TransactionList";

vi.mock("../Transaction/Transaction", () => ({
  default: ({ transaction }) => (
    <li role="listitem">{transaction.description}</li>
  ),
}));

vi.mock("../Filter/Filter", () => ({
  default: ({ isOpen, onFilter, onReset }) =>
    isOpen ? (
      <div>
        <select data-testid="category-filter">
          <option value="">All</option>
          <option value="food">Food</option>
          <option value="salary">Salary</option>
        </select>
        <input data-testid="min-amount-filter" type="number" />
        <input data-testid="max-amount-filter" type="number" />
        <select data-testid="type-filter">
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select data-testid="date-range-filter">
          <option value="">All</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </select>
        <button
          data-testid="apply-filter"
          onClick={() =>
            onFilter({
              category: screen.getByTestId("category-filter").value,
              minAmount: screen.getByTestId("min-amount-filter").value,
              maxAmount: screen.getByTestId("max-amount-filter").value,
              type: screen.getByTestId("type-filter").value,
              dateRange: screen.getByTestId("date-range-filter").value,
            })
          }
        >
          Apply Filter
        </button>
        <button data-testid="reset-filter" onClick={onReset}>
          Reset
        </button>
      </div>
    ) : null,
}));

describe("TransactionList", () => {
  const sampleTransactions = [
    {
      id: 1,
      description: "Groceries",
      amount: 50,
      category: "food",
      type: "expense",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      description: "Salary",
      amount: 1000,
      category: "salary",
      type: "income",
      date: new Date().toISOString(),
    },
  ];

  it("correctly renders the transactions passed as props", () => {
    render(<TransactionList transactions={sampleTransactions} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(within(listItems[0]).getByText("Groceries")).toBeInTheDocument();
    expect(within(listItems[1]).getByText("Salary")).toBeInTheDocument();
  });

  it('displays "No transactions found" when there are no transactions', () => {
    render(<TransactionList transactions={[]} />);

    const emptyStateItem = screen.getByRole("listitem");
    expect(emptyStateItem).toHaveTextContent("No transactions found");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("filters transactions based on category", async () => {
    const user = userEvent.setup();
    render(<TransactionList transactions={sampleTransactions} />);

    await user.click(screen.getByTestId("filter-toggle"));

    await user.selectOptions(screen.getByTestId("category-filter"), "food");
    await user.click(screen.getByTestId("apply-filter"));

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(1);
    expect(within(listItems[0]).getByText("Groceries")).toBeInTheDocument();
  });

  it("resets filters to show all transactions", async () => {
    const user = userEvent.setup();
    render(<TransactionList transactions={sampleTransactions} />);

    await user.click(screen.getByTestId("filter-toggle"));
    await user.selectOptions(screen.getByTestId("category-filter"), "food");
    await user.click(screen.getByTestId("apply-filter"));

    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    await user.click(screen.getByTestId("reset-filter"));

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(within(listItems[0]).getByText("Groceries")).toBeInTheDocument();
    expect(within(listItems[1]).getByText("Salary")).toBeInTheDocument();
  });
});
