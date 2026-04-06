import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBars, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../../context/FinanceContext";
import { exportTransactions } from "../../utils//export";

function Header({ setSidebarOpen, onExport }) {
  const { role, darkMode, setDarkMode, activeTab } = useApp();

  const pageTitles = {
    dashboard: "Financial Overview",
    transactions: "Transactions",
    insights: "Insights & Analytics",
  };

  const handleExportJSON = () => {
    exportTransactions();
  };

  return (
    <div className="topbar">

      <div className="topbar-left">
        <button className="hamburger" onClick={() => setSidebarOpen(o => !o)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="page-title">{pageTitles[activeTab]}</h1>
      </div>

      <div className="topbar-right">

        {role === "viewer" && <span className="tag-viewer">VIEW ONLY</span>}
        {role === "admin" && <span className="tag-admin">ADMIN</span>}

        <button className="export-btn flex-row-center" onClick={handleExportJSON}>
          <FontAwesomeIcon icon={faFileExport} />
          <span className="ml-1">JSON</span>
        </button>

        <button className="dark-toggle" onClick={() => setDarkMode(d => !d)}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>

      </div>
    </div>
  );
}

export default Header;