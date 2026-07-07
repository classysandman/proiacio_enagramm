import { useState } from "react";
import AccountList from "./components/AccountList";
import TransactionList from "./components/TransactionList";
import TransferForm from "./components/TransferForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleTransferComplete() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Money Transfer App</h1>
      <TransferForm onTransferComplete={handleTransferComplete} />
      <AccountList refreshKey={refreshKey} />
      <TransactionList refreshKey={refreshKey} />
    </div>
  );
}

export default App;