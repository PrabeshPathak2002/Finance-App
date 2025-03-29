import { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://finance-app-3myj.onrender.com/transactions/all")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched transactions:", data);
        setTransactions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Transaction List</h2>
      {loading ? <p>Loading...</p> : null}
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "5px" }}>
            <p><strong>{transaction.description}</strong></p>
            <p>Type: {transaction.type}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {new Date(transaction.date).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
