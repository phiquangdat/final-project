const url = "https://www.cc.puv.fi/~e2401782/php/BudgetTrackerAPI.php";
const get_Transaction = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

const add_Transaction = async (transaction) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

const delete_Transaction = async (id) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

const update_Transaction = async (transaction) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
};
export {
  get_Transaction,
  add_Transaction,
  delete_Transaction,
  update_Transaction,
};
