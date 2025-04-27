import { createContext, useEffect, useReducer } from "react";
import {
  get_Transaction,
  add_Transaction,
  delete_Transaction,
  update_Transaction,
} from "../../api.js";
export const BudgetContext = createContext(null);

const initialState = {
  transactions: [],
  theme: "light",
  currency: "€",
};

function BudgetReducer(state, action) {
  if (action.type == "SET_TRANSACTION") {
    return {
      ...state,
      transactions: action.payload,
    };
  } else if (action.type == "UPDATE_TRANSACTION") {
    update_Transaction(action.payload);
    return {
      ...state,
      transactions: [...state.transactions, action.payload],
    };
  } else if (action.type == "ADD_TRANSACTION") {
    const transaction = action.payload;
    if (transaction.amount > 0) {
      transaction.type = "income";
    } else if (transaction.amount < 0) {
      transaction.type = "expense";
    }
    action.payload = transaction;

    return {
      ...state,
      transactions: [...state.transactions, action.payload],
    };
  } else if (action.type == "DELETE_TRANSACTION") {
    delete_Transaction(action.payload);
    return {
      ...state,
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      ),
    };
  } else if (action.type == "set_theme") {
    return { ...state, theme: action.payload };
  } else if (action.type == "set_currency") {
    return { ...state, currency: action.payload };
  }
}

export default function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);

  useEffect(() => {
    const response = get_Transaction();
    response.then((data) => getTransaction(data));
  }, []);
  function getTransaction(data) {
    dispatch({ type: "SET_TRANSACTION", payload: data });
  }
  function updateTransaction(transaction) {
    dispatch({ type: "UPDATE_TRANSACTION", payload: transaction });
  }
  function addTransaction(transaction) {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  }
  function deleteTransaction(transactionId) {
    dispatch({ type: "DELETE_TRANSACTION", payload: transactionId });
  }
  const saldo = state.transactions.reduce(
    (prev, transaction) => prev + Number(transaction.amount),
    0
  );
  return (
    <BudgetContext.Provider
      value={{
        transactions: state.transactions,
        saldo,
        getTransaction,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        state,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
