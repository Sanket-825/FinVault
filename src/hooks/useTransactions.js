import { useMemo, useCallback } from "react";
import { filterTransactions, sortTransactions } from "../utils/filters";

export function useTransactions(transactions, filters, sortOptions) {
  const { type, category, month, search } = filters;
  const { sortField, sortDir } = sortOptions;

  const filteredTransactions = useMemo(() => {
    const filtered = filterTransactions(transactions, { type, category, month, search });
    return sortTransactions(filtered, sortField, sortDir);
  }, [transactions, type, category, month, search, sortField, sortDir]);

  const availableMonths = useMemo(() => {
    const set = new Set(transactions.map(t => t.date.slice(0, 7)));
    return Array.from(set).sort();
  }, [transactions]);

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { month: m, income: 0, expense: 0 };
      if (t.type === "income") map[m].income += t.amount;
      else map[m].expense += t.amount;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const categorySpend = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([cat, amt]) => ({ cat, amt }))
      .sort((a, b) => b.amt - a.amt);
  }, [transactions]);

  // CRUD functions
  const addTransaction = useCallback(
    txn => [...transactions, { ...txn, id: Date.now() }],
    [transactions]
  );

  const editTransaction = useCallback(
    (id, updates) => transactions.map(t => (t.id === id ? { ...t, ...updates } : t)),
    [transactions]
  );

  const deleteTransaction = useCallback(
    id => transactions.filter(t => t.id !== id),
    [transactions]
  );

  return {
    filteredTransactions,
    availableMonths,
    totalIncome,
    totalExpenses,
    balance,
    monthlyData,
    categorySpend,
    addTransaction,
    editTransaction,
    deleteTransaction
  };
}