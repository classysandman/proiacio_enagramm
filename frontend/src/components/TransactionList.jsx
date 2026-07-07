import { useEffect, useState } from "react";
import { getTransactions } from "../api/client";

function TransactionList({ refreshKey }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch((err) => setError(err.message));
  }, [refreshKey]);

  if (error) return <p>Error loading transactions: {error}</p>;

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            #{tx.fromAccountId} → #{tx.toAccountId}: ${tx.amount.toFixed(2)}{" "}
            ({new Date(tx.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;