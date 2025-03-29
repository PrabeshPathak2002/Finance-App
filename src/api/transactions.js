const API_URL = "https://finance-app-3myj.onrender.com";

export const getTransactions = async () => {
  const response = await fetch(`${API_URL}/all`);
  return response.json();
};

export const addTransaction = async (transaction) => {
  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return response.json();
};

export const updateTransaction = async (id, transaction) => {
  await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
};

export const deleteTransaction = async (id) => {
  await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
};