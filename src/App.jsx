import { useEffect, useState } from "react";
import { getTransactions, addTransaction } from "./api/transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ type: "income", description: "", amount: "" });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    await addTransaction({ ...formData, amount: Number(formData.amount) });
    setFormData({ type: "income", description: "", amount: "" });
    fetchTransactions();
  };

  return (
    <div>
      <h1>Finance Tracker</h1>

      <form onSubmit={handleSubmit}>
        <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <button type="submit">Add Transaction</button>
      </form>

      <h2>Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            {t.type.toUpperCase()} - {t.description} - ${t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
