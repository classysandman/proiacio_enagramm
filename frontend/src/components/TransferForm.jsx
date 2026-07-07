import { useState } from "react";
import { transfer } from "../api/client";

function TransferForm({ onTransferComplete }) {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    try {
      await transfer(Number(fromAccountId), Number(toAccountId), Number(amount));
      setMessage("Transfer successful.");
      setIsError(false);
      setFromAccountId("");
      setToAccountId("");
      setAmount("");
      onTransferComplete();
    } catch (err) {
      setMessage(err.message);
      setIsError(true);
    }
  }

  return (
    <div>
      <h2>Transfer Funds</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="From Account ID"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="To Account ID"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          required
        />
        <button type="submit">Transfer</button>
      </form>
      {message && (
        <p style={{ color: isError ? "red" : "green" }}>{message}</p>
      )}
    </div>
  );
}

export default TransferForm;