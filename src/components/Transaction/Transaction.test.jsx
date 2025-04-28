import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Transaction from './Transaction';
import { BudgetContext } from '../../context/BudgetContext';

// Mock the Confirm component
vi.mock('../Confirm/Confirm', () => ({
  default: vi.fn(({ message, onCancel, onConfirm }) => (
    <div data-testid="confirm-dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )),
}));

const mockContextValue = {
  state: { currency: 'USD', theme: 'light' },
  updateTransaction: vi.fn(),
  deleteTransaction: vi.fn(),
};

const renderWithContext = (component) => {
  return render(
    <BudgetContext.Provider value={mockContextValue}>
      {component}
    </BudgetContext.Provider>
  );
};

describe('Transaction Component', () => {
  const transaction = {
    id: 1,
    description: 'Groceries',
    amount: -50,
    category: 'Food',
    isOptimistic: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deletes a transaction when confirmed', () => {
    renderWithContext(<Transaction transaction={transaction} />);
    fireEvent.click(screen.getByText('X')); // Click delete button
    fireEvent.click(screen.getByText('Confirm')); // Click confirm button
    expect(mockContextValue.deleteTransaction).toHaveBeenCalledWith(transaction.id);
  });

  test('renders transaction details correctly', () => {
    renderWithContext(<Transaction transaction={transaction} />);
    const transactionElement = screen.getByRole('listitem');
    expect(transactionElement).toHaveTextContent('Groceries');
    expect(transactionElement).toHaveTextContent('50 USD');
  });

  test('enters edit mode when edit button is clicked', () => {
    renderWithContext(<Transaction transaction={transaction} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByTestId('description-input')).toHaveValue('Groceries');
    expect(screen.getByTestId('amount-input')).toHaveValue(-50);
  });

  test('updates transaction when edit form is submitted', () => {
    renderWithContext(<Transaction transaction={transaction} />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'Updated Groceries' },
    });
    fireEvent.change(screen.getByTestId('amount-input'), {
      target: { value: '-60' },
    });
    fireEvent.click(screen.getByText('Save'));
    expect(mockContextValue.updateTransaction).toHaveBeenCalledWith({
      ...transaction,
      description: 'Updated Groceries',
      amount: -60,
    });
  });
});
