import { useEffect, useState } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "./api/transactions";
import { Container, Typography, TextField, Button, Select, MenuItem, List, ListItem, IconButton, Snackbar, Alert } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ type: "income", description: "", amount: "" });
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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

    if (editingId) {
      await updateTransaction(editingId, { ...formData, amount: Number(formData.amount) });
      setEditingId(null);
      showSnackbar("Transaction updated!", "info");
    } else {
      await addTransaction({ ...formData, amount: Number(formData.amount) });
      showSnackbar("Transaction added!", "success");
    }

    setFormData({ type: "income", description: "", amount: "" });
    fetchTransactions();
  };

  const handleEdit = (transaction) => {
    setFormData({ type: transaction.type, description: transaction.description, amount: transaction.amount });
    setEditingId(transaction._id);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    showSnackbar("Transaction deleted!", "error");
    fetchTransactions();
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const filteredTransactions = transactions.filter((t) => filter === "all" || t.type === filter);
  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <Container maxWidth="sm" style={{ padding: "20px", background: "#f4f4f4", borderRadius: "10px", marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        💰 Finance Tracker
      </Typography>

      {/* Summary */}
      <Typography variant="h6" style={{ color: "green" }}>Total Income: ${totalIncome}</Typography>
      <Typography variant="h6" style={{ color: "red" }}>Total Expense: ${totalExpense}</Typography>
      <Typography variant="h6" style={{ color: balance >= 0 ? "black" : "red" }}>Balance: ${balance}</Typography>

      {/* Transaction Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
        <TextField label="Description" variant="outlined" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <TextField label="Amount" type="number" variant="outlined" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
        <Button variant="contained" color="primary" type="submit">{editingId ? "Update Transaction" : "Add Transaction"}</Button>
      </form>

      {/* Filter */}
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginTop: "20px" }}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </Select>

      {/* Transactions List */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>Transactions</Typography>
      <List>
        {filteredTransactions.map((t) => (
          <ListItem key={t._id} style={{ background: t.type === "income" ? "#d4edda" : "#f8d7da", margin: "5px 0", borderRadius: "5px", padding: "10px" }}>
            {t.type.toUpperCase()} - {t.description} - ${t.amount}
            <IconButton onClick={() => handleEdit(t)}><Edit /></IconButton>
            <IconButton onClick={() => handleDelete(t._id)}><Delete /></IconButton>
          </ListItem>
        ))}
      </List>

      {/* Snackbar (Toast Notifications) */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;