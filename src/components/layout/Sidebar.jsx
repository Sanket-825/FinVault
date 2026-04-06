import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TABS } from "../../constants/roles";
import { useApp } from "../../context/FinanceContext";
import AdminPinModal from "../common/AdminPinModal";
import { useState } from "react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { role, setRole, activeTab, setActiveTab } = useApp();

  const [showPin, setShowPin] = useState(false);

  const handleRoleChange = (value) => {
    if (value === "admin") {
      setShowPin(true);
    } else {
      setRole("viewer");
    }
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">FinVault</div>

          <div className="logo-sub">Financial Dashboard</div>
        </div>

        <nav className="sidebar-nav">
          {TABS.map((t) => (
            <div
              key={t.id}
              className={`nav-item ${activeTab === t.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(t.id);

                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">
                <FontAwesomeIcon icon={t.icon} />
              </span>

              {t.label}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div
            style={{
              fontSize: 10,

              color: "var(--text3)",

              textTransform: "uppercase",

              letterSpacing: 1,

              marginBottom: 8,

              fontWeight: 700,
            }}
          >
            Role
          </div>

          <select
            className="role-selector"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="viewer">👁 Viewer</option>

            <option value="admin">⚙️ Admin</option>
          </select>

          <div className="role-badge">
            {role === "admin" ? "⚙️ ADMIN" : "👁 VIEWER"}
          </div>
        </div>
      </aside>

      {showPin && (
        <AdminPinModal
          onClose={() => setShowPin(false)}
          onSuccess={() => {
            setRole("admin");

            setShowPin(false);
          }}
        />
      )}
    </>
  );
}

export default Sidebar;
