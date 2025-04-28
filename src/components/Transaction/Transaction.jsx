import { useContext, useState } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import Confirm from '../Confirm/Confirm';

export default function Transaction({ transaction }) {
  const { state, updateTransaction, deleteTransaction } = useContext(BudgetContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState({
    description: transaction.description,
    amount: transaction.amount,
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTransaction({
      ...transaction,
      description: editedTransaction.description,
      amount: Number(editedTransaction.amount),
    });
    setIsEditing(false);
  };

  return (
    <>
      <li
        className={[
          transaction.amount > 0 ? 'income' : 'expense',
          transaction.isOptimistic ? 'optimistic' : '',
        ].join(' ')}
      >
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <label htmlFor="edit-description">Description</label>
            <input
              type="text"
              id="edit-description"
              data-testid="description-input"
              value={editedTransaction.description}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  description: e.target.value,
                })
              }
              required
            />
            <label htmlFor="edit-amount">Amount</label>
            <input
              type="number"
              id="edit-amount"
              data-testid="amount-input"
              value={editedTransaction.amount}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  amount: e.target.value,
                })
              }
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <span>{transaction.description}</span>{' '}
            <span>
              {Math.abs(transaction.amount)} {state.currency}
            </span>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => setShowConfirm(true)}>X</button>
          </>
        )}
      </li>

      {showConfirm && (
        <Confirm
          message="Are you sure?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteTransaction(transaction.id);
            setShowConfirm(false);
          }}
        />
      )}
    </>
  );
}
