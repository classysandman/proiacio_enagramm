const BASE_URL = "http://localhost:5059/api";

export async function getAccounts() {
  const res = await fetch(`${BASE_URL}/accounts`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
}

export async function getTransactions() {
  const res = await fetch(`${BASE_URL}/accounts/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export async function transfer(fromAccountId, toAccountId, amount) {
  const res = await fetch(`${BASE_URL}/accounts/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromAccountId, toAccountId, amount }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Transfer failed");
  return data;
}