import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TransactionForm from './TransactionForm';
import { BudgetContext } from '../../context/BudgetContext';

// Mock BudgetContext
const mockAddTransaction = vi.fn();
const mockSetOptimisticTransactions = vi.fn();
const mockContextValue = {
  addTransaction: mockAddTransaction,
};

describe('TransactionForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <TransactionForm setOptimisticTransactions={mockSetOptimisticTransactions} />
      </BudgetContext.Provider>
    );
  });

  // Test 1: Form contains all required fields
  test('renders all required form fields', () => {
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add transaction/i })).toBeInTheDocument();
  });

  // Test 2: Successful form submission calls handlers with correct data
  test('calls handlers with correct data on valid form submission', async () => {
    const user = userEvent.setup();
    
    // Fill form
    await user.type(screen.getByLabelText(/description/i), 'Test Expense');
    await user.type(screen.getByLabelText(/amount/i), '100');
    await user.selectOptions(screen.getByLabelText(/category/i), 'food');
    await user.click(screen.getByRole('button', { name: /add transaction/i }));

    // Check optimistic transaction
    expect(mockSetOptimisticTransactions).toHaveBeenCalledWith(
      expect.any(Function)
    );
    
    // Wait for async operation (simulating the 3-second delay)
    await vi.waitFor(() => {
      expect(mockAddTransaction).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'Test Expense',
          amount: 100,
          category: 'food',
          isOptimistic: false,
        })
      );
    }, { timeout: 4000 });
  });

  // Test 3: Form validation shows errors for invalid inputs
  test('displays validation errors for empty form submission', async () => {
    const user = userEvent.setup();
    
    // Verify initial select value
    const categorySelect = screen.getByLabelText(/category/i);
    expect(categorySelect).toHaveValue('');
    
    await user.click(screen.getByRole('button', { name: /add transaction/i }));
    
    // Wait for the error list to appear
    await vi.waitFor(() => {
      const errorList = screen.getByRole('list', { name: /form errors/i });
      expect(errorList).toBeInTheDocument();
      
      // Check error items
      const errorItems = within(errorList).getAllByRole('listitem');
      expect(errorItems).toHaveLength(3);
      
      // Check for each error message
      expect(within(errorList).getByText('Please enter description')).toBeInTheDocument();
      expect(within(errorList).getByText('Amount is not valid')).toBeInTheDocument();
      expect(within(errorList).getByText('Please select a category')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(mockSetOptimisticTransactions).not.toHaveBeenCalled();
    expect(mockAddTransaction).not.toHaveBeenCalled();
  });

  // Test 4: Form retains entered values after failed submission
  test('retains entered values after failed submission', async () => {
    const user = userEvent.setup();
    
    // Partially fill form
    await user.type(screen.getByLabelText(/description/i), 'Test Expense');
    await user.type(screen.getByLabelText(/amount/i), '100');
    // Category left empty to trigger validation
    await user.click(screen.getByRole('button', { name: /add transaction/i }));
    
    // Check that form retains values
    expect(screen.getByLabelText(/description/i)).toHaveValue('Test Expense');
    expect(screen.getByLabelText(/amount/i)).toHaveValue(100);
  });

  // Test 5: Submit button shows loading state during submission
  test('submit button shows loading state during async submission', async () => {
    const user = userEvent.setup();
    
    // Fill form
    await user.type(screen.getByLabelText(/description/i), 'Test Expense');
    await user.type(screen.getByLabelText(/amount/i), '100');
    await user.selectOptions(screen.getByLabelText(/category/i), 'food');
    await user.click(screen.getByRole('button', { name: /add transaction/i }));
    
    // Check loading state
    expect(screen.getByRole('button', { name: /loading/i })).toBeInTheDocument();
    
    // Wait for submission to complete
    await vi.waitFor(() => {
      expect(screen.getByRole('button', { name: /add transaction/i })).toBeInTheDocument();
    }, { timeout: 4000 });
  });
});
