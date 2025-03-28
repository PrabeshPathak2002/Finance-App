import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import { Card, CardContent, Typography } from "@mui/material";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionForm onSubmit={addTransaction} />
      
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        transactions.map((t, index) => (
          <Card key={index} style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h6">{t.description}</Typography>
              <Typography color={t.type === "income" ? "green" : "red"}>
                {t.type}: ${t.amount}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Transactions;