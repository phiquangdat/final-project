const url = "https://www.cc.puv.fi/~e2401782/php/BudgetTrackerAPI.php";

const get_Transaction = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.status}`);
  }
  return response.json();
};

const add_Transaction = async (transaction) => {
  const type = transaction.amount > 0 ? "income" : "expense";
  const payload = {
    ...transaction,
    type,
  };

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to add transaction: ${response.status}`);
  }

  const result = await response.json();
  if (result.status !== "success" || !result.id) {
    throw new Error("Invalid response from server");
  }

  return {
    ...payload,
    id: result.id,
  };
};

const update_Transaction = async (transaction) => {
  if (!transaction.id) {
    throw new Error("Transaction ID is required for update");
  }

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to update transaction: ${response.status}`);
  }

  const result = await response.json();
  if (result.status !== "success") {
    throw new Error("Invalid response from server");
  }

  return transaction;
};

const delete_Transaction = async (id) => {
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete transaction: ${response.status}`);
  }

  const result = await response.json();
  if (result.status !== "success") {
    throw new Error("Invalid response from server");
  }
};

export {
  get_Transaction,
  add_Transaction,
  delete_Transaction,
  update_Transaction,
};
