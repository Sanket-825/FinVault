export function filterTransactions(
  transactions,
  { type, category, month, search },
) {
  return transactions
    .filter((t) => type === "all" || t.type === type)

    .filter((t) => category === "all" || t.category === category)

    .filter((t) => {
      if (month === "all") return true;

      return t.date.startsWith(month);
    })

    .filter((t) => {
      if (!search) return true;

      const q = search.toLowerCase();

      return (
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
}

export function sortTransactions(transactions, field, direction) {
  return [...transactions].sort((a, b) => {
    let va = a[field];
    let vb = b[field];

    if (field === "amount") {
      va = Number(va);
      vb = Number(vb);
    }

    if (va < vb) return direction === "asc" ? -1 : 1;

    if (va > vb) return direction === "asc" ? 1 : -1;

    return 0;
  });
}
