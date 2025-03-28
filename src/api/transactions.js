import axios from "axios";

const API_URL = "http://localhost:5000/transactions";

// Fetch all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Add a new transaction
export const addTransaction = async (transaction) => {
  try {
    const response = await axios.post(`${API_URL}/add`, transaction);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    return null;
  }
};
