import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTransactions } from "../hooks/useTransactions";
import { SEED_TRANSACTIONS } from "../data/mockTransactions";

const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

function AppProvider({ children }) {
  const [transactionsLS, setTransactionsLS] = useLocalStorage(
    "fin_txns",
    SEED_TRANSACTIONS,
  );
  const [role, setRole] = useLocalStorage("fin_role", "viewer");
  const [darkMode, setDarkMode] = useLocalStorage("fin_dark", true);

  // Filters
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  // Active tab
  const [activeTab, setActiveTab] = useState("dashboard");

  const {
    filteredTransactions,
    availableMonths,
    totalIncome,
    totalExpenses,
    balance,
    monthlyData,
    categorySpend,
    addTransaction: addTxnCalc,
    editTransaction: editTxnCalc,
    deleteTransaction: deleteTxnCalc,
  } = useTransactions(
    transactionsLS,
    {
      type: filterType,
      category: filterCategory,
      month: filterMonth,
      search: searchQuery,
    },
    { sortField, sortDir },
  );

  const addTransaction = (txn) => setTransactionsLS(addTxnCalc(txn));
  const editTransaction = (id, updates) =>
    setTransactionsLS(editTxnCalc(id, updates));
  const deleteTransaction = (id) => setTransactionsLS(deleteTxnCalc(id));

  return (
    <AppContext.Provider
      value={{
        transactions: transactionsLS,
        filteredTransactions,
        role,
        setRole,
        darkMode,
        setDarkMode,
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
        activeTab,
        setActiveTab,
        totalIncome,
        totalExpenses,
        balance,
        monthlyData,
        categorySpend,
        availableMonths,
        addTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, useApp };
