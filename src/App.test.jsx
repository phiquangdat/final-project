import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import { BudgetContext } from './context/BudgetContext';

// Mock dependencies
vi.mock('./components/TransactionList/TransactionList', () => ({
  default: vi.fn(() => <div data-testid="transaction-list">TransactionList</div>),
}));
vi.mock('./components/TransactionForm/TransactionForm', () => ({
  default: vi.fn(() => <div data-testid="transaction-form">TransactionForm</div>),
}));
vi.mock('./components/SettingsDialog/SettingsDialog', () => ({
  default: vi.fn(({ isOpen, onClose }) =>
    isOpen ? <div data-testid="settings-dialog">SettingsDialog</div> : null
  ),
}));
vi.mock('./components/Charts', () => ({
  default: vi.fn(() => <div data-testid="charts">Charts</div>),
}));

const mockContextValue = {
  state: { currency: 'USD', theme: 'light' },
  saldo: 200,
  transactions: [
    { id: 1, description: 'Groceries', amount: -50, category: 'Food' },
    { id: 2, description: 'Salary', amount: 500, category: 'Salary' },
  ],
  addTransaction: vi.fn(),
  updateTransaction: vi.fn(),
  deleteTransaction: vi.fn(),
};

describe('Budget Tracker App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the Budget Tracker header', () => {
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <App />
      </BudgetContext.Provider>
    );
    expect(screen.getByText(/budget tracker/i)).toBeInTheDocument();
  });

  test('displays the correct balance', () => {
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <App />
      </BudgetContext.Provider>
    );
    expect(screen.getByText('200 USD')).toBeInTheDocument();
  });

  test('renders TransactionForm', () => {
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <App />
      </BudgetContext.Provider>
    );
    expect(screen.getByTestId('transaction-form')).toBeInTheDocument();
  });

  test('renders a transaction description', () => {
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <App />
      </BudgetContext.Provider>
    );
    expect(screen.getByTestId('transaction-list')).toBeInTheDocument();
  });
});
