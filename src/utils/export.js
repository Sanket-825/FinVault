export function exportTransactions() {
  const data = JSON.parse(localStorage.getItem("fin_txns") || "[]");

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = "transactions.json";
  a.click();

  URL.revokeObjectURL(url);
}

export function exportTransactionsCSV(transactions) {
  const rows = [["Date", "Description", "Category", "Type", "Amount"]];

  transactions.forEach((t) =>
    rows.push([t.date, t.description, t.category, t.type, t.amount]),
  );

  const csv = rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);

  a.download = "transactions.csv";

  a.click();
}
