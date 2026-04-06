import { CATEGORIES } from "../../constants/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileExport,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function TransactionFilters({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  filterMonth,
  setFilterMonth,
  availableMonths,
  role,
  exportCSV,
  openAdd,
}) {
  return (
    <div className="txn-controls">
      <div className="search-wrap">
        <span className="search-icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          className="search-box"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className="filter-select"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
      >
        <option value="all">All Months</option>
        {availableMonths.map((m) => (
          <option key={m} value={m}>
            {new Date(m + "-01").toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </option>
        ))}
      </select>

      <button className="export-btn" onClick={exportCSV}>
        <FontAwesomeIcon icon={faFileExport} />
        <span className="btn-text">Export CSV</span>
      </button>

      {role === "admin" && (
        <button className="add-btn" onClick={openAdd}>
          <FontAwesomeIcon icon={faPlus} />
          <span className="btn-text">Add Transaction</span>
        </button>
      )}
    </div>
  );
}

export default TransactionFilters;