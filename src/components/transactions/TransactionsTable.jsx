import { fmt, fmtDate } from "../../utils/formatters";
import { useState } from "react";
import { CATEGORY_ICONS } from "../../constants/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";

function TransactionsTable({
  transactions,
  role,
  handleSort,
  sortField,
  sortDir,
  deleteTransaction,
  openEdit,
}) {
  const [deleteId, setDeleteId] = useState(null);

  const SortIcon = ({ field }) =>
    sortField === field ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

  return (
    <div className="txn-table-wrap">
      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔎</div>
          <div className="empty-text">No transactions match your filters</div>
        </div>
      ) : (
        <table className="txn-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort("date")}>
                Date
                <span className="sort-arrow">
                  <SortIcon field="date" />
                </span>
              </th>

              <th
                className="sortable"
                onClick={() => handleSort("description")}
              >
                Description
                <span className="sort-arrow">
                  <SortIcon field="description" />
                </span>
              </th>

              <th>Category</th>
              <th>Type</th>

              <th
                className="sortable text-right"
                onClick={() => handleSort("amount")}
              >
                Amount
                <span className="sort-arrow">
                  <SortIcon field="amount" />
                </span>
              </th>

              {role === "admin" && <th className="text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="td-date">{fmtDate(t.date)}</td>

                <td className="td-desc">{t.description}</td>

                <td>
                  <span className="cat-badge">
                    <FontAwesomeIcon icon={CATEGORY_ICONS[t.category]} />
                    <span className="cat-name">{t.category}</span>
                  </span>
                </td>

                <td>
                  <span className={`type-chip type-${t.type}`}>{t.type}</span>
                </td>

                <td className="td-amount text-right">
                  <span
                    className={
                      t.type === "income" ? "amount-income" : "amount-expense"
                    }
                  >
                    {t.type === "income" ? "+" : "−"}
                    {fmt(t.amount)}
                  </span>
                </td>

                {role === "admin" && (
                  <td className="text-center">
                    <button className="action-btn" onClick={() => openEdit(t)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                      className="action-btn del"
                      onClick={() => setDeleteId(t.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {deleteId && (
        <ConfirmDeleteModal
          onClose={() => setDeleteId(null)}
          onConfirm={() => {
            deleteTransaction(deleteId);

            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}

export default TransactionsTable;
