import { useEffect, useState } from "react";
import { getAccounts } from "../api/client";

function AccountList({ refreshKey }) {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAccounts()
      .then(setAccounts)
      .catch((err) => setError(err.message));
  }, [refreshKey]);

  if (error) return <p>Error loading accounts: {error}</p>;

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.owner} — ${account.balance.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountList;