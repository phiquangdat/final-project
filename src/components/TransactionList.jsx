import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Transaction from "./Transaction";

export default function TransactionList({ transactions }) {
  return (
    <div>
      <h3>Transactions</h3>
      {transactions && (
        <ul className="transaction-list">
          {transactions?.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  );
}
