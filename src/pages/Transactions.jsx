import { useState } from "react";
import { useApp } from "../context/FinanceContext";

import TransactionForm from "../components/transactions/TransactionsForm";
import TransactionFilters from "../components/transactions/TransactionsFilters";
import TransactionsTable from "../components/transactions/TransactionsTable";

import { exportTransactionsCSV } from "../utils/export";

function Transactions() {
  const {
    filteredTransactions,
    role,

    availableMonths,

    filterType,
    setFilterType,

    filterCategory,
    setFilterCategory,

    filterMonth,
    setFilterMonth,

    searchQuery,
    setSearchQuery,

    sortField,
    setSortField,

    sortDir,
    setSortDir,

    addTransaction,
    editTransaction,
    deleteTransaction,
  } = useApp();

  const [activeTxn, setActiveTxn] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);

      setSortDir("desc");
    }
  };

  const handleSave = (data) => {
    if (activeTxn === "add") addTransaction(data);
    else editTransaction(activeTxn.id, data);

    setActiveTxn(null);
  };

  return (
    <div className="content">
      <TransactionFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType={filterType}
        setFilterType={setFilterType}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        availableMonths={availableMonths}
        role={role}
        exportCSV={() => exportTransactionsCSV(filteredTransactions)}
        openAdd={() => setActiveTxn("add")}
      />

      <TransactionsTable
        transactions={filteredTransactions}
        role={role}
        handleSort={handleSort}
        sortField={sortField}
        sortDir={sortDir}
        deleteTransaction={deleteTransaction}
        openEdit={(t) => setActiveTxn(t)}
      />

      {activeTxn && (
        <TransactionForm
          txn={activeTxn === "add" ? null : activeTxn}
          onClose={() => setActiveTxn(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Transactions;
