import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Confirm from "./Confirm/Confirm";

export default function Transaction({ transaction }) {
  const { updateTransaction, deleteTransaction } = useContext(BudgetContext);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <li
        className={[
          transaction.amount > 0 ? "income" : "expense",
          transaction.isOptimistic ? "optimistic" : "",
        ].join(" ")}
      >
        {transaction.description}{" "}
        <button onClick={() => updateTransaction(transaction)}>Edit</button>{" "}
        <button onClick={() => setShowConfirm(true)}>X</button>{" "}
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
