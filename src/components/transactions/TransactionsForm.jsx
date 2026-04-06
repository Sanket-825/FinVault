import { useState } from "react";
import { CATEGORIES } from "../../constants/categories";

function TransactionForm({ txn, onClose, onSave }) {
  const [form, setForm] = useState(
    txn || {
      description: "",
      amount: "",
      category: CATEGORIES[0],
      type: "expense",
      date: new Date().toISOString().slice(0, 10),
    }
  );

  const set = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-title">
          {txn ? "Edit Transaction" : "New Transaction"}
        </div>

        <div className="form-row">
          <label className="form-label">Description</label>
          <input
            className="form-input"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="e.g. Monthly Salary"
          />
        </div>

        <div className="form-row-2">
          <div className="form-row">
            <label className="form-label">Amount (₹)</label>
            <input
              className="form-input"
              type="number"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="form-row">
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-row">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">Type</label>
            <select
              className="form-input"
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn-save"
            onClick={() =>
              form.description &&
              form.amount &&
              onSave({ ...form, amount: +form.amount })
            }
          >
            {txn ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;